import React from 'react';
import { Email, Item, A} from 'react-html-email';
export default function InlineLink({name, children}) {
  return (
  <Email title='link'>
    <Item>
       Hello {name}
       <A style={{ paddingLeft: 10 }}  href='/blog/'>Click me!</A>
    </Item>
    <Item>
      {children}
    </Item>
  </Email>
)};