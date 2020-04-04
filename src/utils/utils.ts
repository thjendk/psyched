import { store } from 'index';
import Symptom from 'classes/Symptom.class';
import Diagnosis from 'classes/Diagnosis.class';
import _ from 'lodash';

export const colors = {
  notParent: {
    color: '#ffdd8f',
    description: 'Tilhører diagnosen specifikt'
  },
  active: {
    color: '#0089e0',
    description: 'Er valgt'
  },
  parent: {
    color: 'white',
    description: 'Tilhører lignende diagnose, eller symptomgruppe valgt specifikt'
  }
};

const getParent = (s: Symptom): Symptom => {
  const state = store.getState();
  const symptoms = state.symptoms.symptoms;
  s = symptoms.find((symp) => symp.id === s.id);

  if (s.parents.length === 0) return s;
  return getParent(s.parents[0]);
};

export const parentIds = (diagnosis: Diagnosis): number[] => {
  const symptoms = diagnosis.symptoms.filter((s) => s.symptom.parents.length > 0);
  if (symptoms.length === 0) return [];
  let parents: Symptom[] = [];
  for (let s of symptoms) {
    const parent = getParent(s.symptom);
    parents.push(parent);
  }
  return _.uniqBy(parents, (p) => p.id).map((s) => s.id);
};

const parentsAndChildren = (diagnosis: Diagnosis): number[] => {
  const filtered = diagnosis.symptoms
    .filter((s) => s.symptom.parents.length === 0)
    .map((s) => s.symptom.id);
  const parents = parentIds(diagnosis);
  return _.union(filtered, parents);
};

export const totalSymptoms = (diagnosis: Diagnosis): number[] => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  const symptoms = diagnosis.symptoms
    .filter((s) => (!s.point || s.point > 0) && s.symptom.parents.length === 0)
    .map((s) => s.symptom.id);
  const parentSymptomIds = parentIds(diagnosis);
  const includedIds = diagnosis.including.flatMap((d) =>
    parentsAndChildren(diagnoses.find((diag) => diag.id === d.id))
  );
  const similarIds = diagnosis.parents.flatMap((d) =>
    parentsAndChildren(diagnoses.find((diag) => diag.id === d.id))
  );
  return _.union(symptoms, parentSymptomIds, includedIds, similarIds);
};

export const addedSymptoms = (diagnosis: Diagnosis): number[] => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  let symptomIds: number[] = [];
  for (let d of diagnosis.including) {
    d = diagnoses.find((diag) => diag.id === d.id);
    symptomIds.push(...totalSymptoms(d));
  }
  for (let d of diagnosis.parents) {
    d = diagnoses.find((diag) => diag.id === d.id);
    symptomIds.push(...totalSymptoms(d));
  }

  return _.uniq(symptomIds);
};
