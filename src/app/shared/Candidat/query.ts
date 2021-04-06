import gql from 'graphql-tag';

const findCandidats = gql`
  query findCandidats
  {
    findCandidats
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
    }
  }`;

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
  }
}`;


export {
  findCandidats,
  findCandidat
}
