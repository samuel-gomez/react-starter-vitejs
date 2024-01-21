import { Button, Modal } from '@axa-fr/react-toolkit-all';
import { ModalCommonBody, ModalCommonFooter, ModalCommonHeader, useToggleModal } from 'shared/components/ModalCommon';
import Details from './Details';
import './PeopleDetail.scss';

type TPeopleDetail = {
  id: string;
  photo: string;
  firstname: string;
  lastname: string;
  entity: string;
};
const PeopleDetail = ({ id, photo, firstname, lastname, entity }: TPeopleDetail) => {
  const { onCancel, openModal, isOpen } = useToggleModal();

  return (
    <>
      <Button onClick={openModal} className="af-btn--circle" aria-label={`Voir le détail de ${firstname} ${lastname}`}>
        <i aria-hidden="true" className="glyphicon glyphicon-eye-open" />
      </Button>
      <Modal isOpen={isOpen} onOutsideTap={onCancel} classModifier="people-detail">
        <ModalCommonHeader onCancel={onCancel} title={`Détail de : ${firstname} ${lastname}`} />
        <ModalCommonBody>
          <article className="af-people-detail">
            <img className="af-people-detail__img" src={photo} alt={`${firstname} ${lastname}`} />
            <h2 className="af-people-detail__title">
              {firstname} {lastname}
              <p className="af-people-detail__subtitle">{entity}</p>
            </h2>
          </article>
          <Details id={id} />
        </ModalCommonBody>
        <ModalCommonFooter confirmLabel="Fermer" onSubmit={onCancel} />
      </Modal>
    </>
  );
};

export default PeopleDetail;
