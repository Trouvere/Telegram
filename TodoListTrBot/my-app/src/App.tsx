import React, { useState } from 'react';
import { Text, useText, Button, ButtonGroup, Image, useBotContext } from '@urban-bot/core';

export function App() {
    const [todos, setTodos] = useState<any[]>([]);

    function addTodo(text: string) {
        const newTodo = { text, id: Math.random(), isCompleted: false };
        setTodos([...todos, newTodo]);
    }

    function toggleTodo(toggledId: any) {
        const newTodos = todos.map((todo) => {
            if (todo.id === toggledId) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted,
                };
            }

            return todo;
        });

        setTodos(newTodos);
    }
    const { chat } = useBotContext();

    useText(({ from }) => console.log(`Пришло сообщение от ${from.username}`));
    useText(({ text }) => {
        addTodo(text);
    });

    const title = todos.map((todo) => (
        <>
            {todo.isCompleted ? <s>{todo.text}</s> : todo.text}
            <br />
        </>
    ));

    const todosButtons = todos.map(({ text, id }) => (
        <Button key={id} onClick={() => toggleTodo(id)}>
            {text}
        </Button>
    ));

    if (todos.length === 0) {
        return <Text>Todo list is empty</Text>;
    }
    const imageByURL =
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdnn11.img.sputnik.by%2Fimg%2F102768%2F82%2F1027688237_175%3A0%3A904%3A801_1920x0_80_0_0_ec162d86740126d12cfa9750eb48cbca.jpg&tbnid=GHHegRDMuYFuvM&vet=12ahUKEwjmqbmt9uP9AhUPB3cKHcT9A-IQMygIegUIARD0AQ..i&imgrefurl=https%3A%2F%2Fsputnik.by%2F20170301%2Ftop-kotov-v-instagram-1027688813.html&docid=Yuxt8Vghjn_YQM&w=1920&h=2109&q=%D0%BA%D0%BE%D1%82&ved=2ahUKEwjmqbmt9uP9AhUPB3cKHcT9A-IQMygIegUIARD0AQ';
    return (
        // <ButtonGroup title={title} maxColumns={3} isNewMessageEveryRender={false}>
        <>
            <Text>Чат id {chat.id}</Text>
            <Text>Hello, world!</Text>
            <Image file={imageByURL} />
            <ButtonGroup title={title} maxColumns={3}>
                {todosButtons}
            </ButtonGroup>
        </>
    );
}
