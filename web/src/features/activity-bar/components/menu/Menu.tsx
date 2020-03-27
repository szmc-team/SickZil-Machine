/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FaHome, FaEdit, FaThumbsUp } from 'react-icons/fa'
import MenuList from './MenuList'
import MenuListItem from './MenuListItem'

const Menu: React.FC = () => {
  return (
    <MenuList>
      <MenuListItem>
        <FaHome />
        <span>Home</span>
      </MenuListItem>
      <MenuListItem>
        <FaEdit />
        <span>Editor</span>
      </MenuListItem>
      <MenuListItem>
        <FaThumbsUp />
        <span>Blahblah</span>
      </MenuListItem>
    </MenuList>
  )
}

export default Menu
