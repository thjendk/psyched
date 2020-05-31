import { Diagnosis as DiagnosisType, DiagnosisInput, DiagnosisParentInput } from 'types/generated';
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
      icdCode
      description
      groups {
        id
      }
      parent {
        id
      }
      children {
        id
      }
    }
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
    } catch (error) {}
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
      const diagnosis = await Apollo.mutate<Diagnosis>('createDiagnosis', mutation, { data });
      store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
    } catch (error) {}
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
      const diagnosis = await Apollo.mutate<Diagnosis>('updateDiagnosis', mutation, { id, data });
      store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
    } catch (error) {}
  };

  static remove = async (id: number) => {
    const mutation = gql`
      mutation RemoveDiagnosis($id: Int) {
        removeDiagnosis(id: $id)
      }
    `;

    const result = await Apollo.mutate<number>('removeDiagnosis', mutation, { id });
    store.dispatch(diagnosisReducer.actions.removeDiagnosis(result));
  };

  static addOrRemoveParent = async (data: DiagnosisParentInput) => {
    const mutation = gql`
      mutation DiagnosisParent($data: DiagnosisParentInput) {
        diagnosisParent(data: $data) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    const diagnosis = await Apollo.mutate<Diagnosis>('addDiagnosisParent', mutation, {
      data
    });
    store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
  };
}

export default Diagnosis;
