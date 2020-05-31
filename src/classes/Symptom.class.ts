import { Symptom as SymptomType, SymptomInput, SymptomParentInput } from 'types/generated';
import { gql } from 'apollo-boost';
import { store } from 'index';
import symptomReducer from 'redux/reducers/symptoms';
import Apollo from './Apollo';

interface Symptom extends SymptomType {}

class Symptom {
  static fragment = gql`
    fragment Symptom on Symptom {
      id
      name
      description
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
      query Symptoms {
        symptoms {
          ...Symptom
        }
      }
      ${Symptom.fragment}
    `;

    try {
      const symptoms = await Apollo.query<Symptom[]>('symptoms', query);
      store.dispatch(symptomReducer.actions.setSymptoms(symptoms));
    } catch (error) {}
  };

  static pick = async (id: number) => {
    store.dispatch(symptomReducer.actions.addSymptomId(id));
  };

  static create = async (data: SymptomInput) => {
    const mutation = gql`
      mutation CreateSymptom($data: SymptomInput) {
        createSymptom(data: $data) {
          ...Symptom
        }
      }
      ${Symptom.fragment}
    `;

    try {
      const symptom = await Apollo.mutate<Symptom>('createSymptom', mutation, { data });
      store.dispatch(symptomReducer.actions.addSymptom(symptom));
    } catch (error) {}
  };

  static update = async (id: number, data: SymptomInput) => {
    const mutation = gql`
      mutation UpdateSymptom($id: Int, $data: SymptomInput) {
        updateSymptom(id: $id, data: $data) {
          ...Symptom
        }
      }
      ${Symptom.fragment}
    `;

    const symptom = await Apollo.mutate<Symptom>('updateSymptom', mutation, { id, data });
    store.dispatch(symptomReducer.actions.addSymptom(symptom));
  };

  static remove = async (id: number) => {
    const mutation = gql`
      mutation RemoveSymptom($id: Int) {
        removeSymptom(id: $id)
      }
    `;

    const result = await Apollo.mutate<number>('removeSymptom', mutation, { id });
    store.dispatch(symptomReducer.actions.removeSymptom(result));
  };

  static addOrRemoveParent = async (data: SymptomParentInput) => {
    const mutation = gql`
      mutation SymptomParent($data: SymptomParentInput) {
        addSymptomParent(data: $data) {
          ...Symptom
        }
      }
      ${Symptom.fragment}
    `;

    const symptom = await Apollo.mutate<Symptom>('addSymptomParent', mutation, { data });
    store.dispatch(symptomReducer.actions.addSymptom(symptom));
  };
}

export default Symptom;
