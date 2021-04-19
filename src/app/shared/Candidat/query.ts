import gql from 'graphql-tag';

const findCandidats = gql`
  query findCandidats {
    findCandidats {
      id
      nom
      prenom
      cin
      dateNaiss
      adresse
      tel
      email
      recommande
      cv {
        posteAct
      #   formations {
      #     universite
      #     specialite
      #     niveau
      #   }
      #   competences {
      #     nom
      #   }
      }
    }
  }
`;

const findCandidat = gql`
query findCandidat($idCand: Int!)
{
  findCandidat(idCand: $idCand)
  {
    id
    nom
    prenom
    cin
    dateNaiss
    adresse
    tel
    email
    avatar
    recommande
  }
}`;

const removeCandidat = gql`
  mutation removeCandidat($idCand: Int!)
  {
    removeCandidat(idCand: $idCand)
  }`;

const findFilterCands = gql`
  query findFilterCands($selectedComp: [String!], $selectedPoste: [String!], $selectedUniver: [String!],
  $selectedSpec: [String!], $selectedNiv: [String!]) {
    findFilterCands(selectedComp: $selectedComp, selectedPoste: $selectedPoste, selectedUniver: $selectedUniver,
      selectedSpec: $selectedSpec, selectedNiv: $selectedNiv ) {
      id
      nom
      prenom
      cin
      dateNaiss
      adresse
      tel
      email
      avatar
    }
  }
`;


export {
  findCandidats,
  findCandidat,
  removeCandidat,
  findFilterCands
}
