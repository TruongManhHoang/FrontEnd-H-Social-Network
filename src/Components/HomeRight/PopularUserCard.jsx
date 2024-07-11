import { Avatar, Button, CardHeader } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const PopularUserCard = () => {
  return (
    <div>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          </Avatar>
        }
        action={
          <Button size='small'>
            Follow
          </Button>
        }
        title="Hoang"
        subheader="@Hoang"
      />
    </div>
  )
}

export default PopularUserCard