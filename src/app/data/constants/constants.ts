export declare type TypeButton =
    | 'primary'
    | 'default'
    | 'dashed'
    | 'text'
    | 'link';
export declare type TypesInputs = 'input' | 'date' | 'time' | 'textArea';
export declare type ThemeTypeIcon = 'fill' | 'outline' | 'twotone';
export declare type TypeTextElement =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'span'
    | 'p';
export declare type TypeText = 'secondary' | 'success' | 'warning' | 'danger';
export declare type TypeElementTable =
    | 'span'
    | 'switch'
    | 'radio'
    | 'checkbox'
    | 'select'
    | 'actions'
    | 'circle-color'
    | 'button'
    | 'image';
export type ModalActionsType = 'success' | 'error' | 'info' | 'confirm';
export type UserActions = 'get' | 'save' | 'update' | 'delete';
export type ShowComponent = 'Form' | 'Table';
export type TypeNotification =
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'blank';

//for pipes
export const specialKeys: string[] = [
    'Backspace',
    'Delete',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
];

export const QuillConfiguration = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button

        ['link'], // link and image, video ['link', 'image', 'video']
    ],
};

//Type events angular
// interface GlobalEventHandlersEventMap {
//     "abort": UIEvent;
//     "animationcancel": AnimationEvent;
//     "animationend": AnimationEvent;
//     "animationiteration": AnimationEvent;
//     "animationstart": AnimationEvent;
//     "auxclick": MouseEvent;
//     "beforeinput": InputEvent;
//     "blur": FocusEvent;
//     "cancel": Event;
//     "canplay": Event;
//     "canplaythrough": Event;
//     "change": Event;
//     "click": MouseEvent;
//     "close": Event;
//     "compositionend": CompositionEvent;
//     "compositionstart": CompositionEvent;
//     "compositionupdate": CompositionEvent;
//     "contextmenu": MouseEvent;
//     "copy": ClipboardEvent;
//     "cuechange": Event;
//     "cut": ClipboardEvent;
//     "dblclick": MouseEvent;
//     "drag": DragEvent;
//     "dragend": DragEvent;
//     "dragenter": DragEvent;
//     "dragleave": DragEvent;
//     "dragover": DragEvent;
//     "dragstart": DragEvent;
//     "drop": DragEvent;
//     "durationchange": Event;
//     "emptied": Event;
//     "ended": Event;
//     "error": ErrorEvent;
//     "focus": FocusEvent;
//     "focusin": FocusEvent;
//     "focusout": FocusEvent;
//     "formdata": FormDataEvent;
//     "gotpointercapture": PointerEvent;
//     "input": Event;
//     "invalid": Event;
//     "keydown": KeyboardEvent;
//     "keypress": KeyboardEvent;
//     "keyup": KeyboardEvent;
//     "load": Event;
//     "loadeddata": Event;
//     "loadedmetadata": Event;
//     "loadstart": Event;
//     "lostpointercapture": PointerEvent;
//     "mousedown": MouseEvent;
//     "mouseenter": MouseEvent;
//     "mouseleave": MouseEvent;
//     "mousemove": MouseEvent;
//     "mouseout": MouseEvent;
//     "mouseover": MouseEvent;
//     "mouseup": MouseEvent;
//     "paste": ClipboardEvent;
//     "pause": Event;
//     "play": Event;
//     "playing": Event;
//     "pointercancel": PointerEvent;
//     "pointerdown": PointerEvent;
//     "pointerenter": PointerEvent;
//     "pointerleave": PointerEvent;
//     "pointermove": PointerEvent;
//     "pointerout": PointerEvent;
//     "pointerover": PointerEvent;
//     "pointerup": PointerEvent;
//     "progress": ProgressEvent;
//     "ratechange": Event;
//     "reset": Event;
//     "resize": UIEvent;
//     "scroll": Event;
//     "scrollend": Event;
//     "securitypolicyviolation": SecurityPolicyViolationEvent;
//     "seeked": Event;
//     "seeking": Event;
//     "select": Event;
//     "selectionchange": Event;
//     "selectstart": Event;
//     "slotchange": Event;
//     "stalled": Event;
//     "submit": SubmitEvent;
//     "suspend": Event;
//     "timeupdate": Event;
//     "toggle": Event;
//     "touchcancel": TouchEvent;
//     "touchend": TouchEvent;
//     "touchmove": TouchEvent;
//     "touchstart": TouchEvent;
//     "transitioncancel": TransitionEvent;
//     "transitionend": TransitionEvent;
//     "transitionrun": TransitionEvent;
//     "transitionstart": TransitionEvent;
//     "volumechange": Event;
//     "waiting": Event;
//     "webkitanimationend": Event;
//     "webkitanimationiteration": Event;
//     "webkitanimationstart": Event;
//     "webkittransitionend": Event;
//     "wheel": WheelEvent;
// }
