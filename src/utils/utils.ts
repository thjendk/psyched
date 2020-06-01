import { Group } from 'types/generated';
import Symptom from 'classes/Symptom.class';
import Diagnosis from 'classes/Diagnosis.class';
import { store } from 'index';
import _ from 'lodash';

export const colors = {
  // notParent: {
  //   color: '#ffdd8f',
  //   description: 'Tilhører diagnosen specifikt'
  // },
  active: {
    color: '#0089e0',
    description: 'Er valgt'
  },
  parent: {
    color: 'white',
    description: 'Tilhører lignende diagnose, eller symptomgruppe valgt specifikt'
  }
};

export const groupSymptoms = (g: Group): Symptom[] => {
  const state = store.getState();

  g = state.groups.groups.find((group) => group.id === g.id);
  if (!g) return [];

  if (g.children.length === 0) return g.symptoms;
  return _.unionBy(
    [...g.symptoms, ...g.children.flatMap((group) => groupSymptoms(group))],
    (s) => s.id
  );
};

export const diagnosisSymptoms = (d: Diagnosis) => {
  return d.groups.flatMap((g) => groupSymptoms(g));
};
