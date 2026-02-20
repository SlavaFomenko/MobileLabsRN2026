export const generateNews = (startId = 0, count = 15) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${startId + i}`,
    title: `Новина #${startId + i + 1}`,
    description: `Це детальний опис новини №${startId + i + 1}. Тут міститься важлива інформація про події у світі технологій, науки та культури.`,
    image: `https://picsum.photos/seed/${startId + i + 1}/400/200`,
    date: new Date(Date.now() - (startId + i) * 3600000).toLocaleDateString('uk-UA'),
    category: ['Технології', 'Наука', 'Спорт', 'Культура'][Math.floor(Math.random() * 4)],
  }));
};