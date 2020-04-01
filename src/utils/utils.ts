import Diagnosis from 'classes/Diagnosis.class';
import { store } from 'index';
import { DiagnosisSymptom } from 'types/generated';
import _ from 'lodash';

const diagnosisParentSymptoms = (diagnosis: Diagnosis) => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  return diagnosis.parents
    .map((p) => diagnoses.find((d) => d.id === p.id))
    .flatMap((d) =>
      d.symptoms.filter(
        (s) => !diagnosis.symptoms.map((symp) => symp.symptom.id).includes(s.symptom.id)
      )
    )
    .map((ds) => ({ ...ds, point: 0 }));
};

const diagnosisIncludingSymptoms = (diagnosis: Diagnosis) => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  return diagnosis.including
    .map((p) => diagnoses.find((d) => d.id === p.id))
    .flatMap((d) =>
      d.symptoms.filter(
        (s) =>
          !diagnosis.symptoms.map((symp) => symp.symptom.id).includes(s.symptom.id) &&
          !diagnosis.parents
            .flatMap((p) => diagnoses.find((d) => d.id === p.id).symptoms.map((s) => s.symptom.id))
            .includes(s.symptom.id)
      )
    );
};

const diagnosisSymptomParents = (diagnosis: Diagnosis, diagnosisSymptoms: DiagnosisSymptom[]) => {
  const state = store.getState();
  const symptoms = state.symptoms.symptoms;
  let parentIds = diagnosis.symptoms.flatMap((s) =>
    s.symptom.parents
      .map((p) => p.id)
      .filter((id) => !diagnosisSymptoms.map((s) => s.symptom.id).includes(id))
  );
  parentIds = _.uniq(parentIds);
  return parentIds.map((id) => ({ symptom: symptoms.find((s) => s.id === id) }));
};

export const totalSymptoms = (diagnosis: Diagnosis) => {
  let symptoms = diagnosis.symptoms
    .concat(diagnosisParentSymptoms(diagnosis))
    .concat(diagnosisIncludingSymptoms(diagnosis));
  symptoms = symptoms.concat(diagnosisSymptomParents(diagnosis, symptoms));
  return symptoms;
};

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
