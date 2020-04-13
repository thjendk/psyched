import { store } from 'index';
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

export const allIds = (d: Diagnosis): number[] => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  const parents = _.union(
    diagnosisParentIds(d),
    d.including.flatMap((d) => allIds(diagnoses.find((diag) => diag.id === d.id))),
    d.parents.flatMap((d) => allIds(diagnoses.find((diag) => diag.id === d.id)))
  );
  return _.uniq(parents.flatMap((id) => [id, ...childIds(id)]));
};

export const diagnosisParentIds = (d: Diagnosis): number[] => {
  const parentIds = d.symptoms.flatMap((s) => symptomTopParents(s.symptom.id));
  return _.uniq(parentIds);
};

const symptomTopParents = (symptomId: number): number[] => {
  const state = store.getState();
  const symptoms = state.symptoms.symptoms;
  const s = symptoms.find((s) => s.id === symptomId);

  if (s.parents.length === 0) return [s.id];
  return _.uniq(s.parents.flatMap((p) => symptomTopParents(p.id)));
};

/**
 * Returns the child IDs from the entire tree, starting from the input and down
 */
export const childIds = (symptomId: number): number[] => {
  const state = store.getState();
  const symptoms = state.symptoms.symptoms;
  const s = symptoms.find((s) => s.id === symptomId);

  if (s.children.length === 0) return [symptomId];
  const ids = s.children.reduce((r, s) => (r = [...r, s.id]), [] as number[]);
  return _.uniq(ids.flatMap((id) => [id, ...childIds(id)]));
};

export const chosenSymptoms = (d: Diagnosis) => {
  const state = store.getState();
  const symptoms = state.symptoms.symptoms;
  const selectedIds = state.symptoms.selectedIds;

  const bannedIds = d.symptoms.filter((s) => s.point < 0 || s.hidden).map((s) => s.symptom.id);
  const diagnosisSymptoms = allIds(d)
    .filter((id) => !bannedIds.includes(id))
    .map((id) => symptoms.find((s) => s.id === id));

  return diagnosisSymptoms.filter((s) => selectedIds.includes(s.id));
};

export const isAchieved = (d: Diagnosis) => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;
  d = diagnoses.find((diag) => diag.id === d.id);

  if (hasConflict(d)) return false;
  const sum = chosenSymptoms(d).reduce(
    (sum, s) => (sum += d.symptoms.find((ds) => ds.symptom.id === s.id)?.point || 0),
    0
  );
  return sum >= 100;
};

export const hasConflict = (d: Diagnosis) => {
  const state = store.getState();
  const selectedIds = state.symptoms.selectedIds;

  if (
    d.excluding.some((d) => isAchieved(d)) ||
    d.including.some((d) => !isAchieved(d)) ||
    d.symptoms.filter((s) => selectedIds.includes(s.symptom.id)).some((s) => s.point < 0)
  )
    return true;
  return false;
};

export const symptomCount = (diagnosis: Diagnosis) => {
  const state = store.getState();
  const symptoms = state.symptoms.symptoms;

  const bannedIds = diagnosis.symptoms
    .filter((s) => s.point < 0 || s.hidden)
    .map((s) => s.symptom.id);

  const diagnosisSymptoms = allIds(diagnosis)
    .map((id) => symptoms.find((s) => s.id === id))
    .filter((s) => !bannedIds.includes(s.id))
    .filter(
      (s) =>
        !s.parents.some((p) => diagnosis.symptoms.find((ds) => ds.symptom.id === p.id)?.hidden) ||
        !!diagnosis.symptoms.find((ds) => ds.symptom.id === s.id)
    );

  return diagnosisSymptoms.length;
};
