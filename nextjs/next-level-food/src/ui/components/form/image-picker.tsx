'use client';

// #region Imports

import { ChangeEvent, useRef, useState } from 'react';

import Image from 'next/image';

import classes from './image-picker.module.css';

// #endregion

interface ImagePickerProps {
  label: string;
  name: string;
}

export function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  function handleClickPick() {
    if (imageInputRef.current !== null) {
      imageInputRef.current.click();
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="The image selected by the user." fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button className={classes.button} type="button" onClick={handleClickPick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
