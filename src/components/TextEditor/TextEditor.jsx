import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import clsx from 'clsx';
import cn from './style.module.scss';
import Button from '../Button/Button';
import InsertLinkModal from '../Modal/Modal';
import Input from '../Input/Input';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCopy,
  FaCut,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaUnderline,
  FaUnlink,
  FaUndo,
  FaRedo,
  FaStrikethrough
} from 'react-icons/fa';

const format = ['Save as pdf', 'New File', 'Save as txt'];
const Size = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 30, 32, 34, 36, 38, 40];
const fontList = [
  { name: 'Arial', fontFamily: 'Arial, sans-serif' },
  { name: 'Verdana', fontFamily: 'Verdana, sans-serif' },
  { name: 'Times New Roman', fontFamily: 'Times New Roman, serif' },
  { name: 'Garamond', fontFamily: 'Garamond, serif' },
  { name: 'Georgia', fontFamily: 'Georgia, serif' },
  { name: 'Courier New', fontFamily: 'Courier New, monospace' },
  { name: 'cursive', fontFamily: 'cursive' },
  { name: 'Roboto', fontFamily: 'Roboto, sans-serif' },
  { name: 'Open Sans', fontFamily: 'Open Sans, sans-serif' },
  { name: 'Lato', fontFamily: 'Lato, sans-serif' },
  { name: 'Montserrat', fontFamily: 'Montserrat, sans-serif' },
  { name: 'Oswald', fontFamily: 'Oswald, sans-serif' },
  { name: 'Raleway', fontFamily: 'Raleway, sans-serif' },
  { name: 'Merriweather', fontFamily: 'Merriweather, serif' },
  { name: 'Ubuntu', fontFamily: 'Ubuntu, sans-serif' },
  { name: 'Pacifico', fontFamily: 'Pacifico, cursive' },
  { name: 'Playfair Display', fontFamily: 'Playfair Display, serif' },
  { name: 'Montserrat Alternates', fontFamily: 'Montserrat Alternates, sans-serif' },
  { name: 'Nunito', fontFamily: 'Nunito, sans-serif' },
  { name: 'Cabin', fontFamily: 'Cabin, sans-serif' },
  { name: 'Alegreya', fontFamily: 'Alegreya, serif' },
  { name: 'Libre Baskerville', fontFamily: 'Libre Baskerville, serif' },
];

const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

const TextEditor = forwardRef((props, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState('');
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const fileNameInputRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
    console.log(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    get innerHTML() {
      return editorRef.current.innerHTML;
    },
    set innerHTML(html) {
      editorRef.current.innerHTML = html;
    }
  }));

  const handleToggle = () => {
    setIsActive(!isActive);
    const editor = editorRef.current;

    if (editor) {
      if (isActive) {
        editor.innerHTML = content;
      } else {
        setContent(editor.innerHTML);
        editor.textContent = editor.innerHTML;
      }
    }
  };

  const handleFileAction = (action) => {
    const content = editorRef.current.innerText; //editor dagi text

    if (action === 'New File') {
      editorRef.current.innerHTML = "";
      console.log('Cleared editor content');
    } else if (action === 'Save as pdf') {
      html2pdf(content).save(fileName);
      console.log('Saving as PDF');
    } else if (action === 'Save as txt') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      console.log('Saving as TXT');
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const insertLink = (url) => {
    if (url) {
      document.execCommand('createLink', false, url);
    }
  };

  return (
    <div className={cn[clsx('text-editor-container')]}>
      <div className={cn[clsx('toolbar')]}>
        <div className={cn[clsx('select-section')]}>
          <Input
            defaultValue="untitled"
            type="text"
            className={cn[clsx('input-file')]}
            placeholder="File-name"
            onChange={handleFileNameChange}
            ref={fileNameInputRef}
          />

          <select
            name="fontSize"
            defaultValue={3}
            onChange={(e) => {
              modifyText('fontSize', false, e.currentTarget.value);
            }}
          >
            {Size.map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
          <select name="Format" onChange={(e) => handleFileAction(e.target.value)}>
            {format.map((e, i) => (
              <option value={e} key={i}>
                {e}
              </option>
            ))}
          </select>
          <select
            name="fontName"
            defaultValue={3}
            onChange={(e) => {
              modifyText('fontName', false, e.currentTarget.value);
            }}
          >
            {fontList.map((font, index) => (
              <option key={index} value={font.name} style={{ fontFamily: font.fontFamily }}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div className={cn[clsx('button-section')]}>
          <Button onClick={() => modifyText('bold', false, null)}>
            <FaBold />
          </Button>
          <Button onClick={() => modifyText('italic', false, null)}>
            <FaItalic />
          </Button>
          <Button onClick={() => modifyText('redo', false, null)}>
            <FaRedo />
          </Button>
          <Button onClick={() => modifyText('undo', false, null)}>
            <FaUndo />
          </Button>
          <Button onClick={() => modifyText('underline', false, null)}>
            <FaUnderline />
          </Button>
          <Button onClick={() => modifyText('strikeThrough', false, null)}>
            <FaStrikethrough />
          </Button>
          <Button onClick={openModal}>
            <FaLink />
          </Button>
          <Button onClick={() => modifyText('unlink', false, null)}>
            <FaUnlink />
          </Button>
          <Button onClick={() => modifyText('insertUnorderedList', false, null)}>
            <FaListUl />
          </Button>
          <Button onClick={() => modifyText('insertOrderedList', false, null)}>
            <FaListOl />
          </Button>
          <Button onClick={() => modifyText('justifyLeft', false, null)}>
            <FaAlignLeft />
          </Button>
          <Button onClick={() => modifyText('justifyCenter', false, null)}>
            <FaAlignCenter />
          </Button>
          <Button onClick={() => modifyText('justifyRight', false, null)}>
            <FaAlignRight />
          </Button>
          <Button onClick={() => modifyText('copy', false, null)}>
            <FaCopy />
          </Button>
          <Button onClick={() => modifyText('cut', false, null)}>
            <FaCut />
          </Button>
          <Button onClick={handleToggle} data-active={isActive.toString()}>
            &lt;/&gt;
          </Button>
        </div>

        <div className={cn[clsx('color-section')]}>
          <div className={cn[clsx('text-color')]}>
            <input
              type="color"
              onChange={(e) => {
                modifyText('foreColor', false, e.currentTarget.value);
              }}
            />
            <span>Text Color</span>
          </div>
          <div className={cn[clsx('bc-color')]}>
            <input
              type="color"
              onChange={(e) => {
                modifyText('backColor', false, e.currentTarget.value);
              }}
            />
            <span>Background Color</span>
          </div>
        </div>
      </div>

      <div className={cn[clsx('editor')]} contentEditable ref={editorRef}></div>

      <InsertLinkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onInsert={insertLink}
      />
    </div>
  );
});

export default TextEditor;
