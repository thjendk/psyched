import Diagnosis from 'classes/Diagnosis.class';
import { store } from 'index';

export const totalSymptoms = (diagnosis: Diagnosis) => {
  const state = store.getState();
  const diagnoses = state.diagnoses.diagnoses;

  return diagnosis.symptoms.concat(
    diagnoses
      .filter((d) => d.children.map((p) => p.id).includes(diagnosis.id))
      .flatMap((d) =>
        d.symptoms.filter(
          (s) => !diagnosis.symptoms.map((symp) => symp.symptom.id).includes(s.symptom.id)
        )
      )
  );
};
