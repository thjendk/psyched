import { Diagnosis as DiagnosisType, DiagnosisInput } from 'types/generated';
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

  static create = async (data: DiagnosisInput) => {
    const mutation = gql`
      mutation CreateDiagnosis($data: DiagnosisInput) {
        createDiagnosis(data: $data) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    try {
      store.dispatch(diagnosisReducer.actions.setStatus('loading'));
      const diagnosis = await Apollo.mutate<Diagnosis>('createDiagnosis', mutation, { data });
      store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
      store.dispatch(diagnosisReducer.actions.setStatus('success'));
    } catch (error) {
      store.dispatch(diagnosisReducer.actions.setStatus('error'));
    }
  };

  static update = async (id: number, data: DiagnosisInput) => {
    const mutation = gql`
      mutation UpdateDiagnosis($id: Int, $data: DiagnosisInput) {
        updateDiagnosis(id: $id, data: $data) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    try {
      store.dispatch(diagnosisReducer.actions.setStatus('loading'));
      const diagnosis = await Apollo.mutate<Diagnosis>('updateDiagnosis', mutation, { id, data });
      store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
      store.dispatch(diagnosisReducer.actions.setStatus('success'));
    } catch (error) {
      store.dispatch(diagnosisReducer.actions.setStatus('error'));
    }
  };

  static addSymptom = async (diagnosisId: number, symptomId: number) => {
    const mutation = gql`
      mutation AddSymptomToDiagnosis($diagnosisId: Int, $symptomId: Int) {
        addSymptomToDiagnosis(diagnosisId: $diagnosisId, symptomId: $symptomId) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    try {
      store.dispatch(diagnosisReducer.actions.setStatus('loading'));
      const diagnosis = await Apollo.mutate<Diagnosis>('addSymptomToDiagnosis', mutation, {
        diagnosisId,
        symptomId
      });
      store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
      store.dispatch(diagnosisReducer.actions.setStatus('success'));
    } catch (error) {
      store.dispatch(diagnosisReducer.actions.setStatus('error'));
    }
  };

  static removeSymptom = async (diagnosisId: number, symptomId: number) => {
    const mutation = gql`
      mutation RemoveSymptomFromDiagnosis($diagnosisId: Int, $symptomId: Int) {
        removeSymptomFromDiagnosis(diagnosisId: $diagnosisId, symptomId: $symptomId) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    try {
      store.dispatch(diagnosisReducer.actions.setStatus('loading'));
      const diagnosis = await Apollo.mutate<Diagnosis>('removeSymptomFromDiagnosis', mutation, {
        diagnosisId,
        symptomId
      });
      store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
      store.dispatch(diagnosisReducer.actions.setStatus('success'));
    } catch (error) {
      store.dispatch(diagnosisReducer.actions.setStatus('error'));
    }
  };
}

export default Diagnosis;
