import ImageCardIcon from '../assets/icons/kg-card-type-image.svg';
import React from 'react';
import {FORMAT_TEXT_COMMAND} from 'lexical';
import {INSERT_IMAGE_COMMAND} from '../nodes/ImageNode';

export default function NavToolbar({editor}) {
    return (
        <ul className="mb-5 flex space-x-2">
            <li
                className="border-gray-300 flex w-[35px] cursor-pointer items-center justify-center rounded-md border p-2 py-1 font-bold hover:border-blue-500 hover:bg-blue-100 "
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
                }
            >
                B
            </li>
            <li
                className="border-gray-300 flex w-[35px] cursor-pointer items-center justify-center rounded-md border p-2 py-1 italic hover:border-blue-500 hover:bg-blue-100"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
                }
            >
                I
            </li>
            <li
                className="border-gray-300 flex w-[35px] cursor-pointer items-center justify-center rounded-md border p-2 py-1 underline hover:border-blue-500 hover:bg-blue-100 "
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
                }
            >
                U
            </li>
            <li
                className="border-gray-300 text-500 flex w-[35px] cursor-pointer items-center justify-center rounded-md border p-2  py-1 hover:border-blue-500 hover:bg-blue-100 "
                onClick={() => editor.dispatchCommand(INSERT_IMAGE_COMMAND, {})}
            >
                <img
                    alt="Image"
                    src={ImageCardIcon}
                    style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        verticalAlign: 'middle'
                    }}
                />
            </li>
        </ul>
    );
}
