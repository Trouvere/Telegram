import React, { useState } from 'react';
import { Text, useText, Button, ButtonGroup } from '@urban-bot/core';

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

    return (
        <ButtonGroup title={title} maxColumns={3} isNewMessageEveryRender={false}>
            {todosButtons}
        </ButtonGroup>
    );
}
