import { reactive } from 'vue';

type MessageClassType = 'alert-success' | 'alert-primary' | 'alert-danger';

type FlashMessageStoreType = {
    message: string | undefined,
    messageClass: MessageClassType,
    setMessage: (newMessage: string, 
        newMessageClass?: MessageClassType, time?: number) => void
}

const flashMessage = reactive<FlashMessageStoreType>({
    message: undefined,
    messageClass: 'alert-primary',
    setMessage(newMessage: string, 
        newMessageClass: MessageClassType = 'alert-primary', time: number = 5000) {
            this.message = newMessage;
            this.messageClass = newMessageClass;
            if(this.message) {
                setTimeout(() => {
                    this.message = undefined;
                }, time);
            }
        }
});

export default flashMessage;