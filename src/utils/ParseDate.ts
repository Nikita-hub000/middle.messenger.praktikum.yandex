import MessageComponent, {
  MessageProps,
} from '../layouts/main/messages/messages';
const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
const parseData = (data: MessageProps[]) => {
  const result = {};
  data.forEach((message) => {
    const messageDate = new Date(message.time);
    const day = messageDate.getDate();
    const month = messageDate.getMonth() + 1;
    const key = `${day} ${month}`;

    if (!result[key]) {
      result[key] = [];
    }
    if (message.text) {
      result[key].push(
        new MessageComponent({
          text: message.text || '',
          time: `${messageDate.getHours()}:${messageDate.getMinutes()}`,
          fromMe: message.fromMe,
        })
      );
    }
    if (message.image) {
      result[key].push(
        new MessageComponent({
          image: message.image || '',
          time: `${messageDate.getHours()}:${messageDate.getMinutes()}`,
          fromMe: message.fromMe,
        })
      );
    }
  });
  const resultArray = Object.entries(result).map(([date, messages]) => {
    const [day, month] = date.split(' ');

    return {
      day: Number(day),
      month: Number(month),
      date: `${day} ${months[month - 1]}`,
      messages,
    };
  });

  return resultArray;
};

export default parseData;
