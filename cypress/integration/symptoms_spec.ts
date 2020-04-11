const symptoms = [
  { name: 'Angst', description: 'Masser af angst' },
  { name: 'Hallucination', description: 'Personen ser ting' },
  { name: 'Uro', description: 'Kommer af angst' },
  { name: 'Psykose', description: 'Helt ude af den' },
  { name: 'Negative symptomer', description: 'Ses ved depression' },
  { name: 'Energiforladt', description: 'Forladt af energi' }
];

const createSymptom = (name: string, description: string) => {
  cy.contains('p', 'Tilføj symptom').click();
  cy.get('input[placeholder=Navn]').type(name);
  cy.get('textarea[placeholder=Beskrivelse]')
    .first()
    .type(description);
  cy.contains('button', 'Tilføj')
    .first()
    .click();
};

describe('creating symptoms', () => {
  it('should be able to open add symptom', () => {
    cy.contains('p', 'Tilføj symptom').click();
  });

  it('should be able to cancel creating symptom', () => {
    cy.contains('button', 'Annuller').click();
  });

  it('should be able to create 6 symptoms', () => {
    for (let symptom of symptoms) {
      createSymptom(symptom.name, symptom.description);
    }
  });

  it('should contain 6 items', () => {
    for (let symptom of symptoms) {
      cy.contains(symptom.name).should('exist');
    }
  });
});

describe('adding categories to symptoms', () => {
  it('should be able to add a category to the first symptom', () => {
    cy.contains('span', 'Tilføj kategori').click();
    cy.get('div[role=option]')
      .first()
      .click();
    cy.contains('p', 'Alle symptomer').click(); // Click outside element to add category
    cy.wait(1000);
    cy.get('span[content=Hallucination]').should('have.length', 2); // A header should have been created
    cy.contains('span', 'hallucination')
      .siblings()
      .should('contain', 'i[class="grey close icon"]');
  });
});
