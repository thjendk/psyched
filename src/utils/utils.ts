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

export const parentsAndChildren = (diagnosis: Diagnosis): number[] => {
  const filtered = diagnosis.symptoms
    .filter((s) => s.symptom.parents.length === 0)
    .map((s) => s.symptom.id);
  const parents = parentIds(diagnosis);
  return _.union(filtered, parents);
};

export const allIds = (d: Diagnosis): number[] => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  const parents = _.union(
    parentIds(d),
    d.including.flatMap((d) => parentIds(diagnoses.find((diag) => diag.id === d.id))),
    d.parents.flatMap((d) => parentIds(diagnoses.find((diag) => diag.id === d.id)))
  );
  return parents.flatMap((id) => [id, ...childIds(id)]);
};

export const parentIds = (diagnosis: Diagnosis): number[] => {
  let parents: Symptom[] = [];
  for (let s of diagnosis.symptoms) {
    const parent = topParent(s.symptom);
    parents.push(parent);
  }
  return _.uniqBy(parents, (p) => p.id).map((s) => s.id);
};

const topParent = (s: Symptom): Symptom => {
  const state = store.getState();
  const symptoms = state.symptoms.symptoms;
  s = symptoms.find((symp) => symp.id === s.id);

  if (s.parents.length === 0) return s;
  return topParent(s.parents[0]);
};

/**
 * Returns the child IDs from the entire tree, starting from the input and down
 */
export const childIds = (id: number): number[] => {
  const state = store.getState();
  const symptoms = state.symptoms.symptoms;
  const s = symptoms.find((s) => s.id === id);

  if (s.children.length === 0) return [id];
  const ids = s.children.reduce((r, s) => (r = [...r, s.id]), [] as number[]);
  return ids.flatMap((id) => [id, ...childIds(id)]);
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
