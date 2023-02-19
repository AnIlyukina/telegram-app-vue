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
 const queryId = tg.initDataUnsafe?.query_id;
 return {
   tg,
   onToggleButton,
   onClose,
   username,
   queryId,
 };
}
