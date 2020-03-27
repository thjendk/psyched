import { Diagnosis as DiagnosisType } from 'types/generated';
import Symptom from './Symptom.class';
import { gql } from 'apollo-boost';
import Apollo from './Apollo';
import { store } from 'index';
import diagnosisReducer from 'redux/reducers/diagnoses.reducer';

interface Diagnosis extends DiagnosisType {}

class Diagnosis {
  static fragment = gql`
    fragment Diagnosis on Diagnosis {
      id
      name
      description
      symptoms {
        ...Symptom
      }
    }
    ${Symptom.fragment}
  `;

  static fetch = async () => {
    const query = gql`
      query Diagnoses {
        diagnoses {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    try {
      const diagnoses = await Apollo.query<Diagnosis[]>('diagnoses', query);
      store.dispatch(diagnosisReducer.actions.setDiagnoses(diagnoses));
      store.dispatch(diagnosisReducer.actions.setStatus('idle'));
    } catch (error) {
      store.dispatch(diagnosisReducer.actions.setStatus('error'));
    }
  };
}

export default Diagnosis;
