import React, { useState } from 'react';
import { Table, Input, Button, TextArea } from 'semantic-ui-react';
import Diagnosis from 'classes/Diagnosis.class';

export interface DiagnosisInputRowProps {
  diagnosis?: Diagnosis;
  setEditing?: Function;
}

const DiagnosisInputRow: React.SFC<DiagnosisInputRowProps> = ({ diagnosis, setEditing }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState(diagnosis?.name || '');
  const [icdCode, setIcdCode] = useState(diagnosis?.icdCode || '');
  const [description, setDescription] = useState(diagnosis?.description || '');

  const handleSubmit = async () => {
    if (diagnosis) {
      await Diagnosis.update(diagnosis.id, { name, description, icdCode });
      setEditing(false);
    } else {
      if (!name) return;
      setIsAdding(true);
      await Diagnosis.create({ name, description, icdCode });
      setIsAdding(false);
    }
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Input placeholder="Navn" fluid value={name} onChange={(e) => setName(e.target.value)} />
      </Table.Cell>
      <Table.Cell>
        <Input
          placeholder="ICD-10 kode"
          fluid
          value={icdCode}
          onChange={(e) => setIcdCode(e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <TextArea
          placeholder="Beskrivelse"
          style={{ width: '100%' }}
          value={description}
          onChange={(e, { value }) => setDescription(value as string)}
        />
      </Table.Cell>
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
      <Table.Cell />
      <Table.Cell>
        <Button loading={isAdding} disabled={isAdding} onClick={handleSubmit} basic color="blue">
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
      </Table.Cell>
    </Table.Row>
  );
};

export default DiagnosisInputRow;
