"use client";

import { capitalize } from "@/utils/helpers";
import { SvgIcon } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { blue, green, purple, red } from "@mui/material/colors";
import ActionDialog from "./ActionDialog";

const getResource = (action: Action) => {
  switch (action) {
    // share actions
    case "deposit shares":
    case "deposit welfare":
      return {
        color: green[300],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 91.98">
            <path d="M103.85,57.91a2.47,2.47,0,0,1,2.27,1.5l16.47,28.94c.45.87.25,2.62.23,3.63H.05l0-2.5a2.47,2.47,0,0,1,.37-1.27l16.7-29a2.45,2.45,0,0,1,2.17-1.31H50L43.21,46.19a12.27,12.27,0,0,1-1.07-1.54L41.08,42.8h0a1.5,1.5,0,0,1-.31.24l-1.76,1-.31.14a4.93,4.93,0,0,1-5.84-1.3,1.6,1.6,0,0,1-.47.43l-1.76,1a1.69,1.69,0,0,1-.31.13,5,5,0,0,1-6.15-1.64A1,1,0,0,1,24,43l-1.76,1-.31.14c-5.26,2-8-2.8-10.16-6.7l-.59-1L8.52,32l-.08-.14C6.42,28,6.5,24.63,6.59,20.79c0-.65,0-1.3,0-2.21,0,0,0,0,0-.06A12.51,12.51,0,0,1,7.68,13.1,8.08,8.08,0,0,1,11,9.49L26.18.7A4.61,4.61,0,0,1,30.85.57a11.76,11.76,0,0,1,3.92,3.54l17.31,8.07.07,0c.22.1.46.2.72.33L60.71,8,89.53,57.91ZM51,48.84,60,64.58a5.05,5.05,0,0,1,6.91,1.85l11.73-6.77a5.07,5.07,0,0,1,1.85-6.91L61.7,20.14a5.08,5.08,0,0,1-6.92-1.85l-9,5.21.36.61L53.44,36.8a10.44,10.44,0,0,1,2.77-2.32,10.08,10.08,0,1,1-3.68,13.77l-.07-.12-.28.16a6.16,6.16,0,0,1-1.23.55ZM42.78,18.35,49,14.74,32.93,8a1.39,1.39,0,0,1-.55-.46,10.19,10.19,0,0,0-3.07-3,1.85,1.85,0,0,0-1.9,0L12.83,13a5.21,5.21,0,0,0-2.11,2.34c-.53,1.1-.37,2.25-.37,3.92a.31.31,0,0,1,0,.09c0,.63,0,1.45,0,2.24-.08,3.43-.52,5.4,1.15,8.64l2.6,4.29a.57.57,0,0,1,.12.18c0,.06.27.47.58,1,1.63,2.89,3.63,6.47,6.52,5.39l1.29-.75c-.45-.82-.88-1.67-1.29-2.49s-.71-1.45-1.09-2.1a1.46,1.46,0,1,1,2.53-1.47c.38.66.78,1.45,1.19,2.27,1.4,2.81,3,6,5.37,5.16l1.68-1a2.71,2.71,0,0,1,.3-.13c-.58-1-1.11-2-1.61-3-.37-.74-.71-1.44-1.09-2.1A1.46,1.46,0,1,1,31.1,34c.38.65.77,1.45,1.19,2.27,1.39,2.8,3,6,5.36,5.16l1.69-1a1.25,1.25,0,0,1,.36-.15L36.85,35.4a1.46,1.46,0,0,1,2.53-1.47l5.35,9.26c1.28,2.22,3,3.11,4.5,3a3.33,3.33,0,0,0,1.51-.45,3,3,0,0,0,.64-.48h0c0-.12.11-.18.24-.25a2.33,2.33,0,0,0,.27-.35,4.79,4.79,0,0,0,0-4.71l0-.08c-.1-.21-.22-.43-.34-.65L40.35,20a1.47,1.47,0,0,1,2.43-1.64Zm10,44.49H20.72L6.54,87H116.38l-14-24.2H85.17L68.79,72.3H83.91a2.47,2.47,0,1,1,0,4.93H42.57a2.46,2.46,0,1,1,0-4.91H58.29l-5.47-9.46Z" />
          </svg>
        ),
      };
    case "withdraw":
      return {
        color: red[300],
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 366.25"
          >
            <path
              fillRule="nonzero"
              d="M86.43 91.28c9.87 0 17.89 8.01 17.89 17.89s-8.02 17.89-17.89 17.89H61.29c-29.38 0-48.33-16.95-56.68-38.6C1.55 80.52.02 71.92 0 63.35 0 54.8 1.52 46.2 4.58 38.27 12.88 16.77 31.76 0 61.29 0h389.42c29.51 0 48.4 16.8 56.7 38.32 3.07 7.93 4.59 16.53 4.59 25.09-.01 8.57-1.55 17.17-4.61 25.11-8.33 21.62-27.29 38.54-56.68 38.54h-32.64c-9.88 0-17.89-8.01-17.89-17.89s8.01-17.89 17.89-17.89h32.64c12.22 0 20.04-6.86 23.42-15.62 1.48-3.85 2.23-8.05 2.23-12.25 0-4.21-.73-8.4-2.21-12.23-3.34-8.65-11.12-15.4-23.44-15.4h-73.43v196.76H134.72V35.78H61.29c-12.34 0-20.12 6.73-23.45 15.35-1.47 3.82-2.2 8.01-2.2 12.22 0 4.2.75 8.4 2.24 12.25 3.39 8.79 11.21 15.68 23.41 15.68h25.14zm198.55 158.78v38.91h26.56c4.46.19 7.62 1.66 9.45 4.44 4.95 7.42-1.82 14.76-6.51 19.93-13.25 14.61-43.39 41.11-49.96 48.78-4.97 5.5-12.07 5.5-17.04 0-6.79-7.92-38.57-35.94-51.23-50.19-4.38-4.94-9.81-11.67-5.24-18.52 1.83-2.78 4.99-4.25 9.45-4.44h26.56v-38.91h57.96zm55.35-214.28H172.79v118.38c19.73 0 35.83 16.1 35.83 35.83h95.88c0-19.73 16.09-35.83 35.83-35.83V35.78zM256 45.62c23.89 0 43.26 19.37 43.26 43.26 0 23.89-19.37 43.26-43.26 43.26-23.89 0-43.26-19.37-43.26-43.26 0-23.89 19.37-43.26 43.26-43.26z"
            />
          </svg>
        ),
      };
    case "transfer":
      return {
        color: blue[300],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.34 122.88">
            <path d="M0,84V36.22H102.34V84ZM15.34,2.76a2.45,2.45,0,0,0-2.09-.93c-1.83.22-2.19,2.12-2.38,3.58-.57,4.2-3.26,17.11-3.61,19.41a2.41,2.41,0,0,0,.53,2.05,2.45,2.45,0,0,0,1.94.84C12,27.69,24.64,27,29,27.08c1.55,0,3.78.12,4.32-1.8a2.44,2.44,0,0,0-.6-2.21l-5-5.87a48.38,48.38,0,0,1,57.6,8.14c1.18,1.18,2.29,2.41,3.32,3.67h13.61A59.66,59.66,0,0,0,55.92.19,59.5,59.5,0,0,0,20.33,8.58l-5-5.82Zm78,116.48a2.44,2.44,0,0,0,2.12.86c1.81-.28,2.12-2.18,2.27-3.65.44-4.22,2.73-17.2,3-19.52a2.42,2.42,0,0,0-2.56-2.8c-2.26.09-14.88,1.21-19.29,1.21-1.55,0-3.78,0-4.26,1.93a2.45,2.45,0,0,0,.67,2.19l5.37,5.89a48.4,48.4,0,0,1-58.19-7.81A49.72,49.72,0,0,1,18,92.29H4.67a59.53,59.53,0,0,0,83.7,21.47l5,5.48ZM60.52,65a11.39,11.39,0,1,1-5.1-15.27A11.38,11.38,0,0,1,60.52,65ZM86.13,76.58l-69.77-.47a7.41,7.41,0,0,0-7.51-7.28l-.3-17.48a7.42,7.42,0,0,0,7.29-7.51l69.78.46a7.42,7.42,0,0,0,7.51,7.29l.3,17.48a7.41,7.41,0,0,0-7.3,7.51Z" />
          </svg>
        ),
      };

    // loans actions
    case "loan history":
      return {
        color: green[300],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.78 122.88">
            <path d="M70.71,116.29H7.46a7.48,7.48,0,0,1-5.27-2.19L2,113.87a7.43,7.43,0,0,1-2-5V7.46A7.45,7.45,0,0,1,2.19,2.19L2.42,2a7.42,7.42,0,0,1,5-2H91.88a7.48,7.48,0,0,1,7.46,7.46V66.63a3.21,3.21,0,0,1-.06.63,28.75,28.75,0,1,1-28.57,49ZM85.18,82.12h2.89a2,2,0,0,1,1.43.59,2.06,2.06,0,0,1,.6,1.44V94.77h9.59a2,2,0,0,1,2,2v3a2.12,2.12,0,0,1-.6,1.44l-.08.07a2,2,0,0,1-1.35.52H84a1,1,0,0,1-1-1V84a2,2,0,0,1,.59-1.29,2,2,0,0,1,1.43-.6Zm7.75-16.47V7.46a1.1,1.1,0,0,0-1.05-1H7.46a1.08,1.08,0,0,0-.66.23l-.08.08a1.06,1.06,0,0,0-.31.74V108.84a1,1,0,0,0,.23.65l.09.08a1,1,0,0,0,.73.32H65A28.75,28.75,0,0,1,89,65.38a28,28,0,0,1,3.9.27Zm12.36,12.22A23,23,0,1,0,112,94.13a22.92,22.92,0,0,0-6.73-16.26Zm-84.5-3.78h9A1.18,1.18,0,0,1,31,75.27v9a1.18,1.18,0,0,1-1.18,1.18h-9a1.18,1.18,0,0,1-1.18-1.18v-9a1.18,1.18,0,0,1,1.18-1.18Zm22,9.28a3.65,3.65,0,0,1,0-7.18h9.58a3.65,3.65,0,0,1,0,7.18Zm-22-61.22h9A1.18,1.18,0,0,1,31,23.33v9a1.18,1.18,0,0,1-1.18,1.18h-9a1.18,1.18,0,0,1-1.18-1.18v-9a1.18,1.18,0,0,1,1.18-1.18Zm22,9.27a3.33,3.33,0,0,1-3-3.58,3.34,3.34,0,0,1,3-3.59H78.25a3.34,3.34,0,0,1,3,3.59,3.33,3.33,0,0,1-3,3.58ZM18.34,54.1a2,2,0,0,1,.38-2.82,2.23,2.23,0,0,1,3-.09l2.1,2.17L29.07,48a1.93,1.93,0,0,1,2.82.3,2.23,2.23,0,0,1,.18,3l-7,7.14a1.94,1.94,0,0,1-2.82-.3l-.16-.19a1.94,1.94,0,0,1-.31-.26L18.34,54.1Zm24.4,2.69a3.34,3.34,0,0,1-3-3.59,3.34,3.34,0,0,1,3-3.59H78.25a3.34,3.34,0,0,1,3,3.59,3.34,3.34,0,0,1-3,3.59Z" />
          </svg>
        ),
      };
    case "request":
      return {
        color: red[300],
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 393 511.7"
          >
            <path d="M26.15 49.46h62.7l-2.72 25.48H43.96c-11.81 0-22.08 10.27-22.08 22.07v370.26c0 11.74 9.95 22.08 22.08 22.08h305.02c12.12 0 22.07-9.96 22.07-22.08V97.01c0-12.12-10.27-22.07-22.07-22.07h-44.83V49.46h62.7c14.38 0 26.15 11.89 26.15 26.15v409.94c0 14.29-11.86 26.15-26.15 26.15H26.15C11.86 511.7 0 499.94 0 485.55V75.61c0-14.38 11.77-26.15 26.15-26.15zm52.2 389.76c-5.08 0-9.19-4.11-9.19-9.19 0-5.07 4.11-9.18 9.19-9.18h164.29c5.07 0 9.19 4.11 9.19 9.18 0 5.08-4.12 9.19-9.19 9.19H78.35zm0-55.54c-5.08 0-9.19-4.12-9.19-9.19 0-5.07 4.11-9.19 9.19-9.19h220.84c5.08 0 9.19 4.12 9.19 9.19 0 5.07-4.11 9.19-9.19 9.19H78.35zm0-55.55c-5.08 0-9.19-4.11-9.19-9.19 0-5.07 4.11-9.18 9.19-9.18h236.3c5.08 0 9.19 4.11 9.19 9.18 0 5.08-4.11 9.19-9.19 9.19H78.35zm0-55.54c-5.08 0-9.19-4.12-9.19-9.19 0-5.07 4.11-9.19 9.19-9.19h236.3c5.08 0 9.19 4.12 9.19 9.19 0 5.07-4.11 9.19-9.19 9.19H78.35zm39.95-65.21H77.65v-63.51h20.33v47.25h20.32v16.26zm5.59-31.7c0-11.59 2.17-20.04 6.51-25.36 4.33-5.31 12.16-7.97 23.47-7.97 11.32 0 19.14 2.66 23.48 7.97 4.33 5.32 6.5 13.77 6.5 25.36 0 5.76-.46 10.6-1.37 14.53-.92 3.93-2.49 7.35-4.73 10.26-2.23 2.92-5.31 5.05-9.25 6.41-3.92 1.35-8.8 2.03-14.63 2.03-5.82 0-10.7-.68-14.63-2.03-3.93-1.36-7.01-3.49-9.25-6.41-2.24-2.91-3.81-6.33-4.72-10.26-.92-3.93-1.38-8.77-1.38-14.53zm21.85-10.57v26.42h8.44c2.77 0 4.79-.32 6.04-.97 1.26-.64 1.88-2.11 1.88-4.42v-26.42h-8.53c-2.71 0-4.69.33-5.95.97-1.25.64-1.88 2.12-1.88 4.42zm63.42 42.27h-21.45l16.47-63.51h31.4l16.46 63.51H230.6l-2.34-10.06h-16.77l-2.33 10.06zm7.98-45.36-3.35 20.51h12.07l-3.25-20.51h-5.47zm79.11 45.36-15.55-22.55c-.54-.75-.88-2.38-1.02-4.88h-.4v27.43h-20.33v-63.51h19.11l15.54 22.56c.55.75.88 2.37 1.02 4.88h.41v-27.44h20.32v63.51h-19.1zM125.07 36.52h29.63C157.2 15.92 173.83 0 193.98 0c20.02 0 36.56 15.71 39.24 36.09l34.68.43c2.42 0 4.37 1.94 4.37 4.35v46.84c0 2.41-1.95 4.35-4.37 4.35H125.1c-2.37 0-4.36-1.94-4.36-4.35V40.87c-.04-2.41 1.91-4.35 4.33-4.35zm52.68 17.91c2.67 3.67 6.51 7.3 10.58 9.15 3.32 1 6.94 1.09 10.3.17 5.28-2.41 10.11-8.24 12.35-13.11.26-1.39.44-2.81.44-4.37 0-10.32-7.9-18.69-17.66-18.69-9.75 0-17.66 8.37-17.66 18.69.06 3.1.61 5.87 1.65 8.16z" />
          </svg>
        ),
      };
    case "payment":
      return {
        color: blue[300],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.28 122.88">
            <path d="M0,49.17,49.6,0,81.28,31.13l-5.11,2.38-22-21.59-.26-.27a5.06,5.06,0,0,0-7.15.16l-1.79,1.86-.06-.06-8.4,8.9L4.34,53.42,0,49.17ZM13.41,76.85l-.3,1.92c-.79,5.12-2.07,13.44-2.59,16.38a2.18,2.18,0,0,1-.17.51,1.29,1.29,0,0,1-.26.42,19.68,19.68,0,0,0-1.61,2.39,6.65,6.65,0,0,0-.76,1.89,2.23,2.23,0,0,0,0,1,1.73,1.73,0,0,0,.48.79C13.08,107.05,18.26,112,23,117a6.54,6.54,0,0,0,5.34,1.68,31.75,31.75,0,0,0,5.3-1.15,43.8,43.8,0,0,0,5.54-1.61,15.85,15.85,0,0,0,4.9-3l4.08-4.26a1.37,1.37,0,0,1,.19-.22l0,0c.12-.12.47-.47,1-.94l0,0c2.7-2.64,6-5.89,4.13-8.59l-1.37-1.37-1,.9L49.8,99.53c-.7.61-1.35,1.19-1.94,1.77a2.11,2.11,0,0,1-3-3c.63-.63,1.39-1.31,2.18-2l.1-.08c2.65-2.35,5.68-5,4.2-7.2l-1.61-1.61c-.38.39-.78.76-1.18,1.13s-1,.92-1.52,1.36L46.9,90c-.68.6-1.32,1.16-1.91,1.75a2.11,2.11,0,0,1-3-3c.61-.61,1.36-1.28,2.15-2l.12-.11c2.65-2.34,5.68-5,4.21-7.2-.56-.55-1.13-1.1-1.67-1.67l-4.48,4.48a2.11,2.11,0,0,1-3-3l9-9a7.51,7.51,0,0,0,1.89-2.88,4.36,4.36,0,0,0,.08-2.8,3.8,3.8,0,0,0-.37-.79,3.69,3.69,0,0,0-.52-.66,3.48,3.48,0,0,0-.67-.53,4,4,0,0,0-.78-.36,4.34,4.34,0,0,0-2.79.1,8.14,8.14,0,0,0-2.94,2L20.59,86.06a2.11,2.11,0,0,1-3-3l.94-.93-5.16-5.27Zm10.15.28L36.42,64.27l-.24-.07A9.18,9.18,0,1,1,47.87,58a8.27,8.27,0,0,1,1.41.33h0a8,8,0,0,1,1.65.76,8.1,8.1,0,0,1,1.45,1.14l0,0a7.7,7.7,0,0,1,.54.6L65.12,48.41a6,6,0,0,1,.1-8.43L54.06,28.58a6,6,0,0,1-8.44-.09h0L15,59.9A6,6,0,0,1,15,68.33l8.61,8.8Zm30.78-8.58v0a11.7,11.7,0,0,1-3,4.85l-1.47,1.46,1.74,1.74.16.18.14.19a6.16,6.16,0,0,1,.52,7.14l.05,0a2.91,2.91,0,0,1,.33.26l1.7,1.71a.93.93,0,0,1,.16.18l.13.17a6.48,6.48,0,0,1,1.42,4.23A7,7,0,0,1,55,94.19l1.69,1.68.16.19.12.17c4.14,5.66-.68,10.37-4.57,14.17-.26.31-.69.69-1,1-1.36,1.42-3,3.34-4.4,4.6-3.92,3.55-7.78,4.5-12.25,5.59a32.67,32.67,0,0,1-6.12,1.27,10.61,10.61,0,0,1-8.52-2.9L5.33,105.18a5.8,5.8,0,0,1-1.59-2.55,6.49,6.49,0,0,1-.08-3.08v0a10.41,10.41,0,0,1,1-2.74A19.92,19.92,0,0,1,6.52,93.9c.38-2.17,1.21-7.7,2-12.78.45-3.05.89-5.92,1.22-8L1.43,64.63,50.6,15h0L78.83,43.85,54.34,68.55Z" />
          </svg>
        ),
      };

    // shared actions
    default:
      return {
        color: purple[300],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101.24 122.88">
            <g>
              <path d="M23.46,93.89c3.54,0,6.41,2.88,6.41,6.41c0,3.55-2.88,6.42-6.41,6.42c-3.55,0-6.42-2.88-6.42-6.42 C17.05,96.76,19.92,93.89,23.46,93.89L23.46,93.89L23.46,93.89z M96.07,122.87H5.74v0.01c-1.56,0-3-0.65-4.05-1.69l0,0v-0.01H1.68 l-0.01-0.01C0.64,120.13,0,118.7,0,117.14v-96.9c0-1.58,0.65-3.02,1.69-4.06s2.48-1.69,4.06-1.69h14.92v-2.82 c0-1.05,0.43-2.01,1.13-2.71l0,0l0.01-0.01l0.01-0.01c0.7-0.69,1.66-1.12,2.71-1.12h8.81V4.27c0-1.17,0.48-2.23,1.25-3.01 l0.01-0.01l0,0C35.37,0.48,36.43,0,37.6,0h26.89c1.17,0,2.23,0.48,3.01,1.26l0.01-0.01c0.77,0.77,1.25,1.84,1.25,3.02v3.56h7.94 c1.05,0,2.01,0.43,2.71,1.13l0.01,0.01l0.01,0.01l0.01,0.01c0.69,0.7,1.12,1.66,1.12,2.71v2.82h14.92c1.57,0,3.01,0.65,4.05,1.69 l0.01-0.01c1.04,1.04,1.69,2.48,1.69,4.06v102.61L96.07,122.87V20.24c0-0.16-0.07-0.3-0.17-0.41l0.01-0.01H95.9 c-0.1-0.1-0.25-0.16-0.41-0.16l-14.92,0v5.17c0,1.05-0.43,2.01-1.13,2.71h-0.01l-0.01,0.01l-0.01,0.01 c-0.7,0.69-1.66,1.12-2.71,1.12H24.52c-1.06,0-2.03-0.43-2.72-1.13c-0.08-0.08-0.16-0.17-0.22-0.26c-0.56-0.67-0.91-1.54-0.91-2.47 v-5.17H5.74c-0.16,0-0.3,0.07-0.41,0.17c-0.11,0.11-0.17,0.25-0.17,0.41v96.89c0,0.16,0.06,0.31,0.17,0.41l0,0l0.01,0.01 c0.1,0.1,0.25,0.17,0.41,0.17v0.01l90.31,0.01V122.87L96.07,122.87z M66.93,12.96c-0.3,0-0.59-0.05-0.85-0.15 c-1.41,0-2.56-1.15-2.56-2.56V5.18H38.58v5.07c0,1.33-1.01,2.42-2.32,2.55c-0.28,0.1-0.58,0.16-0.88,0.16H26v10.46h49.24V12.96 H66.93L66.93,12.96L66.93,12.96z M47.29,79.45H26.33v9.17c0,1.58-1.28,2.86-2.86,2.86s-2.86-1.28-2.86-2.86V77.45 c0-0.15,0.01-0.29,0.03-0.43c-0.02-0.14-0.03-0.28-0.03-0.43c0-1.58,1.28-2.86,2.86-2.86h23.66l-0.09-7.7 c-0.57-0.17-1.14-0.36-1.7-0.59c-0.56-0.24-1.1-0.49-1.62-0.79l-1.78,1.96c-0.33,0.34-0.74,0.51-1.21,0.53 c-0.47,0.02-0.89-0.13-1.24-0.44l-2.61-2.45c-0.35-0.34-0.55-0.74-0.57-1.21c-0.02-0.48,0.14-0.88,0.47-1.21l1.95-2.11 c-0.3-0.52-0.58-1.06-0.8-1.61c-0.23-0.55-0.43-1.13-0.6-1.72l-2.61,0.1c-0.48,0.02-0.89-0.14-1.25-0.47 c-0.35-0.34-0.53-0.74-0.55-1.19l-0.14-3.58c-0.02-0.48,0.13-0.89,0.45-1.25c0.33-0.35,0.72-0.53,1.21-0.55l2.85-0.11 c0.17-0.59,0.36-1.16,0.59-1.72s0.49-1.1,0.79-1.62l-1.93-1.78c-0.35-0.33-0.55-0.73-0.57-1.21c-0.02-0.47,0.14-0.89,0.47-1.25 l2.4-2.61c0.34-0.35,0.73-0.55,1.21-0.57c0.48-0.02,0.88,0.15,1.21,0.47l2.15,1.95c0.49-0.29,1.01-0.57,1.57-0.81 c0.55-0.23,1.13-0.43,1.72-0.6l-0.1-2.61c-0.02-0.48,0.14-0.89,0.47-1.25c0.34-0.35,0.74-0.53,1.19-0.55l3.58-0.13 c0.48-0.02,0.89,0.13,1.25,0.45c0.35,0.33,0.53,0.72,0.55,1.21l0.11,2.85c0.57,0.17,1.14,0.36,1.7,0.59 c0.56,0.22,1.1,0.49,1.62,0.79l1.78-1.92c0.33-0.35,0.74-0.55,1.21-0.57c0.47-0.02,0.89,0.14,1.25,0.47l0.04,0.03l2.61,2.4 c0.35,0.34,0.55,0.73,0.57,1.21c0.02,0.48-0.15,0.88-0.47,1.21l-1.95,2.15c0.29,0.51,0.57,1.03,0.81,1.6 c0.23,0.57,0.43,1.13,0.6,1.7l2.61-0.1c0.48-0.02,0.89,0.14,1.25,0.47c0.35,0.34,0.53,0.74,0.55,1.19l0.14,3.58 c0.02,0.48-0.13,0.89-0.45,1.25c-0.33,0.35-0.72,0.53-1.21,0.55l-2.85,0.11c-0.17,0.57-0.36,1.14-0.59,1.7 c-0.24,0.56-0.49,1.1-0.79,1.62l1.96,1.78c0.34,0.33,0.51,0.74,0.53,1.21c0.02,0.47-0.13,0.88-0.44,1.24l-2.45,2.62 c-0.31,0.35-0.71,0.54-1.19,0.57c-0.48,0.02-0.89-0.14-1.23-0.47l-2.11-1.95c-0.52,0.3-1.06,0.58-1.62,0.8 c-0.55,0.23-1.13,0.43-1.72,0.6l0.09,7.73h23.61c1.58,0,2.86,1.28,2.86,2.86c0,0.15-0.01,0.29-0.03,0.43 c0.02,0.14,0.03,0.28,0.03,0.43v11.17c0,1.58-1.28,2.86-2.86,2.86c-1.58,0-2.86-1.28-2.86-2.86v-9.16H54.16v8.25 c0,1.9-1.54,3.44-3.44,3.44s-3.44-1.54-3.44-3.44V79.45L47.29,79.45L47.29,79.45z M50.21,45.76c0.97-0.04,1.88,0.1,2.76,0.44 c0.87,0.34,1.63,0.8,2.3,1.41c0.65,0.61,1.18,1.34,1.59,2.18c0.41,0.86,0.62,1.75,0.66,2.72c0.04,0.97-0.11,1.88-0.44,2.76 c-0.34,0.87-0.81,1.63-1.41,2.3c-0.61,0.65-1.34,1.18-2.18,1.59c-0.84,0.4-1.75,0.62-2.72,0.66c-0.97,0.04-1.88-0.11-2.76-0.44 c-0.87-0.34-1.63-0.81-2.3-1.41c-0.65-0.61-1.18-1.34-1.59-2.18c-0.4-0.84-0.62-1.75-0.66-2.72c-0.04-0.97,0.11-1.88,0.44-2.76 c0.34-0.87,0.81-1.63,1.41-2.3c0.61-0.65,1.34-1.18,2.18-1.59C48.35,46.01,49.25,45.8,50.21,45.76L50.21,45.76L50.21,45.76z M77.77,93.89c3.55,0,6.42,2.88,6.42,6.41c0,3.55-2.88,6.42-6.42,6.42c-3.54,0-6.41-2.88-6.41-6.42 C71.35,96.76,74.23,93.89,77.77,93.89L77.77,93.89L77.77,93.89z M50.5,93.89c3.55,0,6.42,2.88,6.42,6.41 c0,3.55-2.88,6.42-6.42,6.42c-3.55,0-6.42-2.88-6.42-6.42C44.09,96.76,46.96,93.89,50.5,93.89L50.5,93.89L50.5,93.89z" />
            </g>
          </svg>
        ),
      };
  }
};

const ActionCard = ({
  action,
  selectedAction,
  handleDialogOpen,
  handleDialogClose,
}: {
  action: Action;
  selectedAction: Action | null;
  handleDialogOpen: (action: Action) => void;
  handleDialogClose: () => void;
}) => {
  const cardResource: { color: string; icon: React.ReactNode } =
    getResource(action);

  return (
    <>
      <Card
        component={ButtonBase}
        onClick={() => handleDialogOpen(action)}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          border: 1,
          boxShadow: 0,
          borderColor: cardResource.color,
          backgroundColor: "transparent",
          py: 4,
          position: "relative",
          width: { xs: "48%", md: "24%" },
          ":hover": {
            boxShadow: 5,
            "& .text": { display: "block" },
            "& .icon": { display: "none" },
          },
        }}
      >
        <Typography
          className="text"
          variant="h5"
          fontWeight={700}
          color={cardResource.color}
          display="none"
        >
          {capitalize(action)}
        </Typography>
        <SvgIcon
          className="icon"
          sx={{ fontSize: "70px", color: cardResource.color, display: "block" }}
        >
          {cardResource.icon}
        </SvgIcon>
      </Card>
      <ActionDialog
        action={action}
        open={action === selectedAction}
        handleClose={handleDialogClose}
      />
    </>
  );
};

export default ActionCard;