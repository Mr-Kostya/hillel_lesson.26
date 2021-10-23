const DELETE_NOTE = ".delete-note";
const EDIT_NOTE_CONTROL = ".edit-note-control";
const NOTE_TEMPLATE = "#noteTemplate";
const LIST = "#list";
const ADD_NOTE_BTN = "#addNoteBtn";

const EMPTY_NOTE = { description: "" };
let notesList = [];

const noteTemplate = $(NOTE_TEMPLATE).html();
const $noteListEl = $(LIST)
    .on("click", DELETE_NOTE, onDeleteClick)
    .on("focusout", EDIT_NOTE_CONTROL, onListFocusout);

$(ADD_NOTE_BTN).on("click", onAddNoteClick);

init();

function onAddNoteClick() {
    createNote(EMPTY_NOTE);
}

function init() {
    getList();
}

function onDeleteClick(e) {
    const $element = $(this);

    $element.fadeOut(1000, () => deleteNote(getElementIndex($element)));
}

function onListFocusout(e) {
    const $element = $(this);

    updateNote(getElementIndex($element), {
        description: $element.val()
    });
}

function setData(data) {
    return (notesList = data);
}

function createNote(note) {
    StickerApi.create(note).then((note) => {
        notesList.push(note);
        renderNote(note);
    });
}

function renderNote(note) {
    const $noteElement = $(getNoteHtml(note));

    $noteListEl.append($noteElement);
}

function updateNote(id, changes) {
    const note = notesList.find((el) => el.id == id);

    Object.keys(changes).forEach((key) => (note[key] = changes[key]));
    StickerApi.update(id, note);
}

function deleteNote(id) {
    notesList = notesList.filter((el) => el.id != id);

    deleteNoteElement(id);
    StickerApi.delete(id);
}

function deleteNoteElement(id) {
    const $element = getNoteElement(id);

    $element && $element.remove();
}

function renderList(notesList) {
    notesList.forEach(renderNote);
}

function getList() {
    StickerApi.getList().then(setData).then(renderList);
}

function getNoteElement(id) {
    return $noteListEl.find(`[data-note-index='${id}']`);
}

function getNoteHtml(note) {
    return noteTemplate
        .replace("{{id}}", note.id)
        .replace("{{description}}", note.description);
}

function getElementIndex($el) {
    const $note = getNoteElementByChild($el);
    return $note && $note.data("noteIndex");
}

function getNoteElementByChild($child) {
    return $child.parent();
}
