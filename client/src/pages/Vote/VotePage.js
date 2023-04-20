import React from 'react';
import {Breadcrumb, Button, Container, Navbar, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {
  fetchAlternativesForVote, fetchEventByExpertId,
  fetchOneExpertForVote, updateExpert
} from "../../http/eventAPI.js";
import {Context} from "../../index.js";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import "../../index.css"

const VotePage = observer(() => {
  const {event} = useContext(Context)
  const {id} = useParams()
  const navigate = useNavigate()
  const [expert, setExpert] = useState('')
  const [eventName, setEventName] = useState('')
  const [alts, setAlts] = useState([])
  useEffect(() => {
    fetchOneExpertForVote(id).then(data => setExpert(data))
    fetchEventByExpertId(id).then(data => setEventName(data))
    fetchAlternativesForVote(expert.eventId).then(data => {
      const items = Array.from(data).map((item, index) => ({
        id: `${index + 1}`,
        name: item.name
      }))
      event.setAlternatives(items)
      setAlts(event.alternatives)
    })
  }, [expert.id])

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
    //console.log(alts)
    const temp = Array.from(alts).map(item => parseInt(item.id))
    //console.log(temp)
    let ranking = []
    temp.forEach((value, index) => {
      ranking[value - 1] = index + 1
    })
    await updateExpert(id, {ranking})
    //console.log(ranking)
    await alert('Ваш голос отправлен!')
    await navigate('/')
  }

  return (
    <Container className="mb-3">
      <Navbar className='mt-3'>
        <Breadcrumb className="mt-lg-2 fs-2">
          <Breadcrumb.Item style={{color: '#495057'}} active>{eventName.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Navbar>
      {expert.ranking &&
        <Row className=" mt-2 ">
          <h4> Вы уже проголосовали</h4>
          <p className="fs-5 mt-2">Ожидайте результатов мериприятия!</p>
        </Row>}
      {!expert.ranking &&
        <>
          <Row className=" mt-2 ">
            <h5> Уважаемый(ая) {expert.name}!</h5>
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

export default VotePage;