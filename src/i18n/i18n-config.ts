import * as i18n from 'i18n';

i18n.configure({
    locales: ['en', 'ru'], // добавьте необходимые языки
    directory: __dirname + '/locales', // папка для файлов переводов
    defaultLocale: 'en',
    autoReload: true,
    updateFiles: true,
    syncFiles: true,
});

export default i18n;
