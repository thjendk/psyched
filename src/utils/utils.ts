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

  if (s.parents.length === 0) return;
  return getParent(s.parents[0]);
};

export const getTopParents = (d: Diagnosis): Symptom[] => {
  const symptoms = d.symptoms.filter((s) => s.symptom.parents.length > 0);
  if (symptoms.length === 0) return [];
  let parents: Symptom[] = [];
  for (let s of symptoms) {
    const parent = getParent(s.symptom);
    if (!parent) continue;
    parents.push(parent);
  }

  return _.uniqBy(parents, (p) => p.id);
};

export const addedSymptoms = (d: Diagnosis) => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  let symptoms: Symptom[] = [];
  for (let diag of d.including) {
    diag = diagnoses.find((d) => d.id === diag.id);
    symptoms.concat(getTopParents(diag));
  }
  for (let diag of d.parents) {
    diag = diagnoses.find((d) => d.id === diag.id);
    symptoms.concat(getTopParents(diag));
  }

  return _.uniqBy(symptoms, (s) => s.id);
};
