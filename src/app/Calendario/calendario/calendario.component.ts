import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput, Duration } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CalendarService } from 'src/app/services/calendar.service';
import { Event } from 'src/app/models/models';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDrop: this.handleEventDrop.bind(this)
  };
  currentEvents: EventApi[] = [];

  constructor(private calendarService: CalendarService, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadEvents(); // Cargar los eventos al inicializar el componente
  }

  loadEvents() {
    this.calendarService.getEvents()
      .then((events: Event[]) => {
        this.calendarOptions.events = events;
      })
      .catch(error => {
        console.error('Error al obtener los eventos:', error);
      });
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Ingresa el nombre del Evento');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Limpiar la selección de fechas

    if (title) {
      const newEvent: Event = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        userId: ''
      };

      this.calendarService.addEvent(newEvent)
        .then(() => {
          calendarApi.addEvent(newEvent);
        })
        .catch(error => {
          console.error('Error al agregar el evento:', error);
        });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`¿Estás seguro de que deseas eliminar el evento '${clickInfo.event.title}'?`)) {
      const eventToRemove = clickInfo.event;
      const eventDocRef = this.firestore.collection('events').doc(eventToRemove.id);
  
      eventDocRef.delete()
        .then(() => {
          console.log('Evento eliminado de la base de datos');
          eventToRemove.remove();
        })
        .catch(error => {
          console.error('Error al eliminar el evento de la base de datos:', error);
        });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  handleEventDrop(dropInfo: { event: EventApi, oldEvent: EventApi, delta: Duration, revert: () => void }) {
    const { event, oldEvent, delta, revert } = dropInfo;
    const newStart = event.start;
    
    // Eliminar el evento original de la base de datos
    this.calendarService.removeEvent(event.id)
      .then(() => {
        console.log('Evento eliminado de la base de datos');
        // Crear un nuevo evento en la nueva fecha
        const newEvent: Event = {
          id: event.id,
          title: event.title,
          start: newStart !== null ? newStart.toISOString() : '',
          end: event.end !== null ? event.end.toISOString() : '',
          allDay: event.allDay,
          userId: event.extendedProps['userId']
        };
        
        this.calendarService.addEvent(newEvent)
          .then(() => {
            console.log('Nuevo evento creado en la base de datos');
          })
          .catch(error => {
            console.error('Error al crear el nuevo evento en la base de datos:', error);
            revert(); // Revertir el cambio en el arrastre
          });
      })
      .catch(error => {
        console.error('Error al eliminar el evento de la base de datos:', error);
        revert(); // Revertir el cambio en el arrastre
      });
  }
}
