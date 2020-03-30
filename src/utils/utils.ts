import Diagnosis from 'classes/Diagnosis.class';
import { store } from 'index';

export const totalSymptoms = (diagnosis: Diagnosis) => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  console.log();

  return diagnosis.symptoms
    .concat(
      diagnosis.parents
        .map((p) => diagnoses.find((d) => d.id === p.id))
        .flatMap((d) =>
          d.symptoms.filter(
            (s) => !diagnosis.symptoms.map((symp) => symp.symptom.id).includes(s.symptom.id)
          )
        )
    )
    .concat(
      diagnosis.including
        .map((p) => diagnoses.find((d) => d.id === p.id))
        .flatMap((d) =>
          d.symptoms.filter(
            (s) =>
              !diagnosis.symptoms.map((symp) => symp.symptom.id).includes(s.symptom.id) &&
              !diagnosis.parents
                .flatMap((p) =>
                  diagnoses.find((d) => d.id === p.id).symptoms.map((s) => s.symptom.id)
                )
                .includes(s.symptom.id)
          )
        )
    );
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
    description: 'Tilhører lignende diagnose'
  }
};
