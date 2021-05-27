import gql from 'graphql-tag';

const findPersonnes = gql`
  query findPersonnes {
    findPersonnes {
      id
      nom
      adresse
      tel
      email
      recommande
      cv {
        id
        cmptLinkedin
        statutCV
        activiteAssociatives
        certificats
        competences
        langues
        experiences
        formations
        projets
        interets
      }
    }
  }
`;

const findPersonne = gql`
  query findPersonne($idPersonne: Int!) {
    findPersonne(idPersonne: $idPersonne) {
      id
      nom
      etatCivil
      dateNaiss
      adresse
      tel
      email
      avatar
      recommande
      cv{
        id
        cmptLinkedin
        statutCV
        activiteAssociatives
        certificats
        competences
        langues
        experiences
        formations
        projets
        interets
      }
    }
  }
`;

const removePersonne = gql`
  mutation removePersonne($idPersonne: Int!)
  {
    removePersonne(idPersonne: $idPersonne)
  }`;

// const findFilterCands = gql`
//   query findFilterCands($selectedComp: [String!], $selectedPoste: [String!], $selectedUniver: [String!],
//   $selectedSpec: [String!], $selectedNiv: [String!]) {
//     findFilterCands(selectedComp: $selectedComp, selectedPoste: $selectedPoste, selectedUniver: $selectedUniver,
//       selectedSpec: $selectedSpec, selectedNiv: $selectedNiv ) {
//       id
//       nom
//       prenom
//       cin
//       dateNaiss
//       adresse
//       tel
//       email
//       avatar
//     }
//   }
// `;

const updateRecommande = gql`
  mutation updateRecommande($value: Boolean!,$idPersonne: Int!) {
    updateRecommande(value: $value,idPersonne: $idPersonne)
    # {
    #   id
    #   nom
    #   adresse
    #   tel
    #   email
    #   recommande
    # }
  }
`;


export {
  findPersonnes,
  findPersonne,
  removePersonne,
  updateRecommande
  // findFilterCands
}
