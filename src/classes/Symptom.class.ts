import { Symptom as SymptomType, SymptomInput } from 'types/generated';
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
      store.dispatch(symptomReducer.actions.setStatus('loading'));
      const symptoms = await Apollo.query<Symptom[]>('symptoms', query);
      store.dispatch(symptomReducer.actions.setSymptoms(symptoms));
      store.dispatch(symptomReducer.actions.setStatus('success'));
    } catch (error) {
      store.dispatch(symptomReducer.actions.setStatus('error'));
    }
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
      store.dispatch(symptomReducer.actions.setStatus('loading'));
      const symptom = await Apollo.mutate<Symptom>('createSymptom', mutation, { data });
      store.dispatch(symptomReducer.actions.addSymptom(symptom));
      store.dispatch(symptomReducer.actions.setStatus('success'));
    } catch (error) {
      store.dispatch(symptomReducer.actions.setStatus('error'));
    }
  };

  static update = async (id: number, data: SymptomInput) => {};
}

export default Symptom;
