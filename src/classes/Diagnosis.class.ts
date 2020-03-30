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
      icdCode
      description
      symptoms {
        symptom {
          ...Symptom
        }
        point
      }
      parents {
        id
      }
      children {
        id
      }
      excluding {
        id
      }
      including {
        id
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

  static remove = async (id: number) => {
    const mutation = gql`
      mutation RemoveDiagnosis($id: Int) {
        removeDiagnosis(id: $id)
      }
    `;

    const result = await Apollo.mutate<number>('removeDiagnosis', mutation, { id });
    store.dispatch(diagnosisReducer.actions.removeDiagnosis(result));
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

  static addParent = async (id: number, parentId: number) => {
    const mutation = gql`
      mutation AddDiagnosisParent($id: Int, $parentId: Int) {
        addDiagnosisParent(id: $id, parentId: $parentId) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    const diagnosis = await Apollo.mutate<Diagnosis>('addDiagnosisParent', mutation, {
      id,
      parentId
    });
    store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
  };

  static removeParent = async (id: number, parentId: number) => {
    const mutation = gql`
      mutation RemoveDiagnosisParent($id: Int, $parentId: Int) {
        removeDiagnosisParent(id: $id, parentId: $parentId) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    const diagnosis = await Apollo.mutate<Diagnosis>('removeDiagnosisParent', mutation, {
      id,
      parentId
    });
    store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
  };

  static updateSymptom = async (diagnosisId: number, symptomId: number, point: number) => {
    const mutation = gql`
      mutation UpdateDiagnosisSymptom($diagnosisId: Int, $symptomId: Int, $point: Int) {
        updateDiagnosisSymptom(diagnosisId: $diagnosisId, symptomId: $symptomId, point: $point) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    const diagnosis = await Apollo.mutate<Diagnosis>('updateDiagnosisSymptom', mutation, {
      diagnosisId,
      symptomId,
      point
    });
    store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
  };

  static addExcluding = async (diagnosisId: number, excludingId: number) => {
    const mutation = gql`
      mutation AddExcludingDiagnosisToDiagnosis($diagnosisId: Int, $excludingId: Int) {
        addExcludingDiagnosisToDiagnosis(diagnosisId: $diagnosisId, excludingId: $excludingId) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    const diagnosis = await Apollo.mutate<Diagnosis>('addExcludingDiagnosisToDiagnosis', mutation, {
      diagnosisId,
      excludingId
    });
    store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
  };

  static removeExcluding = async (diagnosisId: number, excludingId: number) => {
    const mutation = gql`
      mutation RemoveExcludingDiagnosisFromDiagnosis($diagnosisId: Int, $excludingId: Int) {
        removeExcludingDiagnosisFromDiagnosis(
          diagnosisId: $diagnosisId
          excludingId: $excludingId
        ) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    const diagnosis = await Apollo.mutate<Diagnosis>(
      'removeExcludingDiagnosisFromDiagnosis',
      mutation,
      { diagnosisId, excludingId }
    );
    store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
  };

  static addIncluding = async (diagnosisId: number, includingId: number) => {
    const mutation = gql`
      mutation AddIncludingDiagnosisToDiagnosis($diagnosisId: Int, $includingId: Int) {
        addIncludingDiagnosisToDiagnosis(diagnosisId: $diagnosisId, includingId: $includingId) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    const diagnosis = await Apollo.mutate<Diagnosis>('addIncludingDiagnosisToDiagnosis', mutation, {
      diagnosisId,
      includingId
    });
    store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
  };

  static removeIncluding = async (diagnosisId: number, includingId: number) => {
    const mutation = gql`
      mutation RemoveIncludingDiagnosisFromDiagnosis($diagnosisId: Int, $includingId: Int) {
        removeIncludingDiagnosisFromDiagnosis(
          diagnosisId: $diagnosisId
          includingId: $includingId
        ) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    const diagnosis = await Apollo.mutate<Diagnosis>(
      'removeIncludingDiagnosisFromDiagnosis',
      mutation,
      { diagnosisId, includingId }
    );
    store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
  };
}

export default Diagnosis;
