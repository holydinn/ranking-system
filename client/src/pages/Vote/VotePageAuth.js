import React from 'react';
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index.js";
import {useNavigate, useParams} from "react-router-dom";
import {
  fetchAlternatives,
  fetchOneEvent, fetchOneExpert, updateExpertAuth
} from "../../http/eventAPI.js";
import {Breadcrumb, Button, Container, Navbar, Row} from "react-bootstrap";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import "../../index.css"
import ModalComponent from "../../components/Modal.js";

const VotePageAuth = observer(() => {
  const {event} = useContext(Context)
  const {user} = useContext(Context)
  const {id} = useParams()
  const navigate = useNavigate()
  const [expert, setExpert] = useState('')
  const [eventName, setEventName] = useState('')

  useEffect(() => {
    fetchOneExpert(id).then(data => setExpert(data))
    fetchOneEvent(user.user.id, expert.eventId).then(data => setEventName(data))
    fetchAlternatives(expert.eventId).then(data => event.setAlternatives(data))
  }, [expert.id])

  const items = Array.from(event.alternatives).map((item, index) => ({
    id: `${index + 1}`,
    name: item.name
  }));

  const [alts, setAlts] = useState(items)

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = Array.from(alts);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setAlts(newItems);
  };

  const addRanking = async () => {
    const temp = Array.from(alts).map(item => parseInt(item.id))
    let ranking = []
    temp.forEach((value, index) => {
      ranking[value - 1] = index + 1
    })
    await updateExpertAuth(id, {ranking})
    await setError('')
    await handleModalShow('success')
    // await alert('Ваш голос отправлен!')
    // await navigate(`/events/${eventName.id}`)

  }

  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleModalClose = () => {
    setShow(false);
  }
  const handleModalShow = (type) => {
    setModalType(type);
    setShow(true)
    if (type !== 'success'){
      setIsSuccess(false);
    } else{
      setIsSuccess(true);
    }

  }
  const handleSuccessClose = () => {
    setIsSuccess(true);
    navigate(`/events/${eventName.id}`);
  };

  return (
    <Container className="mb-3">
      <ModalComponent
        show={show}
        onHide={handleModalClose}
        title={modalType === 'success' ? 'Успех!' : 'Ошибка!'}
        body={
          modalType === 'success' &&
          'Ваш голос отправлен!'
        }
        error={error}
        isSuccess={isSuccess}
        onSuccessClose={handleSuccessClose}
      />
      <Navbar className='mt-3'>
        <Breadcrumb className="mt-lg-2 fs-2">
          <Breadcrumb.Item onClick={() => navigate(`/events/`)}>Мероприятия</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate(`/events/${eventName.id}`)} >{eventName.name}</Breadcrumb.Item>
          <Breadcrumb.Item style={{color: '#495057'}} active>{expert.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Navbar>
      {expert.ranking &&
        <Row className=" mt-2 ">
          <h4> Вы уже проголосовали</h4>
          <p className="fs-5 mt-2">Ожидайте результатов мериприятия!</p>
        </Row>}
      {!expert.ranking &&
        <>
          <Row className=" mt-2 "><h5>
            Уважаемый(ая) {expert.name}!</h5>
            <p className="fs-5">Для голосования разместите участников в порядке от
              самого приоритетного до менее приоритетного. <br/> Затем нажмите на кнопку отправить</p>
          </Row>
          <Row className="mb-2"><h4>Участники</h4></Row>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="alts">
              {(provided) => (
                <ol className=" fs-5 vote-list" {...provided.droppableProps} ref={provided.innerRef}>
                  {alts.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <li className=""
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                          (№{item.id}) {item.name}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
          </DragDropContext>
          <Button className="mt-3"
                  size="lg"
                  variant={"outline-secondary"}
                  onClick={addRanking}
          >
            Отправить
          </Button>
        </>}
    </Container>
  );
});

export default VotePageAuth;