import React, { useState } from 'react';
import { Table, Input, Button, TextArea, Form } from 'semantic-ui-react';
import Diagnosis from 'classes/Diagnosis.class';
import { useFormik } from 'formik';
import { DiagnosisInput } from 'types/generated';

export interface DiagnosisInputRowProps {
  diagnosis?: Diagnosis;
  setEditing?: Function;
}

const DiagnosisInputRow: React.SFC<DiagnosisInputRowProps> = ({ diagnosis, setEditing }) => {
  const formik = useFormik({
    initialValues: {
      name: diagnosis?.name || '',
      icdCode: diagnosis?.icdCode || '',
      description: diagnosis?.description || ''
    },
    onSubmit: (values) => handleSubmit(values),
    enableReinitialize: true
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (values: DiagnosisInput) => {
    const { name, description, icdCode } = values;
    if (diagnosis) {
      await Diagnosis.update(diagnosis.id, { name, description, icdCode });
      setEditing(false);
    } else {
      if (!name) return;
      setIsAdding(true);
      await Diagnosis.create({ name, description, icdCode });
      setIsAdding(false);
    }
    formik.resetForm();
  };

  return (
    <Table.Row>
      <Table.Cell colSpan={3} style={{ borderTop: '2px solid black' }}>
        <Form onSubmit={() => formik.handleSubmit()}>
          <TextArea
            placeholder="Navn"
            name="name"
            fluid
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </Form>
      </Table.Cell>
      <Table.Cell style={{ borderTop: '2px solid black' }}>
        <Form onSubmit={() => formik.handleSubmit()}>
          <Input
            placeholder="ICD-10 kode"
            fluid
            name="icdCode"
            value={formik.values.icdCode}
            onChange={formik.handleChange}
          />
        </Form>
      </Table.Cell>
      <Table.Cell colSpan={2} style={{ borderTop: '2px solid black' }}>
        <Form onSubmit={() => formik.handleSubmit()}>
          <TextArea
            placeholder="Beskrivelse"
            style={{ width: '100%' }}
            value={formik.values.description}
            onChange={(e, { value }) => formik.setFieldValue('description', value)}
          />
        </Form>
      </Table.Cell>
      <Table.Cell style={{ borderTop: '2px solid black' }}>
        <Button.Group>
          <Button
            loading={isAdding}
            disabled={isAdding}
            onClick={() => formik.handleSubmit()}
            basic
            color="blue"
          >
            {diagnosis ? 'Rediger' : 'Tilføj'}
          </Button>
          {diagnosis && (
            <Button
              loading={isAdding}
              disabled={isAdding}
              onClick={() => setEditing(false)}
              basic
              color="orange"
            >
              Annuller redigering
            </Button>
          )}
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
};

export default DiagnosisInputRow;
