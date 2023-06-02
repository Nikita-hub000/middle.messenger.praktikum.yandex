import { nanoid } from 'nanoid';
import { ChatProps } from '../layouts/main/chats/chats';
const chats: ChatProps = [
  {
    id: nanoid(4),
    name: 'Андрей',
    time: '12:00',
    fromMe: true,
    unread: 0,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Игорь',
    time: 'Пн',
    fromMe: false,
    unread: 0,
    text: 'Изображение',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Катя',
    time: 'Ср',
    fromMe: false,
    unread: 4,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа 1',
    time: '1 Мая 2020',
    fromMe: true,
    unread: 0,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа',
    time: '12 Апр 2022',
    fromMe: false,
    unread: 8,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа',
    time: '12 Апр 2022',
    fromMe: false,
    unread: 8,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа',
    time: '12 Апр 2022',
    fromMe: false,
    unread: 8,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа',
    time: '12 Апр 2022',
    fromMe: false,
    unread: 8,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа',
    time: '12 Апр 2022',
    fromMe: false,
    unread: 8,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа',
    time: '12 Апр 2022',
    fromMe: false,
    unread: 8,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа',
    time: '12 Апр 2022',
    fromMe: false,
    unread: 8,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '12:25',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '12:25',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '12:25',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '12:25',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
  {
    id: nanoid(4),
    name: 'Беседа',
    time: '12 Апр 2022',
    fromMe: false,
    unread: 8,
    text: 'Всем привет!Всем привет!Всем привет!Всем прив',
    events: {
      click: (event) => {
        event.preventDefault();
      },
    },
    messages: [
      {
        time: '2019-12-02T12:22:22.000Z',
        text: 'Привет! Как дела?',
        fromMe: false,
      },
      {
        time: '2019-12-02T13:22:22.000Z',
        text: 'Привет! Все отлично!',
        fromMe: true,
      },
      {
        time: '2019-12-02T14:22:22.000Z',
        text: 'Смотри что нашел',
        fromMe: true,
      },
      {
        time: '2020-01-02T11:22:22.000Z',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: false,
      },
      {
        time: '2020-01-02T15:22:22.000Z',
        image:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.wikipedia.org%2Fwiki%2FTrollface&psig=AOvVaw0qZFMM8o1RkqVnzSW3gs5e&ust=1685404006621000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMj-l6uZmf8CFQAAAAAdAAAAABAE',
        fromMe: true,
      },
    ],
  },
];

export default chats;
