const tg = window.Telegram.WebApp

export function useTelegram () {
 const onToggleButton = () => {
   if (tg.MainButton.isVisible) {
     tg.MainButton.hide();
   } else {
     tg.MainButton.show();
   }
 };

 const onClose = () => {
   tg.close();
 };

 const username = tg.initDataUnsafe?.user?.username;

 return {
    tg,
    onToggleButton,
    onClose,
    username,
 };
}