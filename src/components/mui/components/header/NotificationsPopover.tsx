import {
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState, useRef } from 'react'
import { GoBellFill } from 'react-icons/go'
import { BsCheck2All } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { IconButtonAnimate } from '../animate'
import { Avatar } from '../Avatar'
import MenuPopover from '../MenuPopover'
import { Typography } from '..'

export const notifications = [...Array(2)].map((_, index) => ({
  // id: (index: string) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  avatar: '',
  title: ['You have new message', 'You have new mail', 'Delivery processing'][index],
  description: ['5 unread messages', 'sent from Guido Padberg', 'Your order is being shipped'][index],
  type: ['order_placed', 'chat_message', 'mail', 'order_shipped'][index],
  // createdAt: (index: number) => sub(new Date(), { days: index, hours: index }),
  isUnRead: [true, true, false, false, false][index]
}))
type Notifications = {
  // id: string
  avatar: string
  title: string
  description: string
  type: string
  // createdAt: Date
  isUnRead: boolean
}
export default function NotificationsPopover() {
  const ref = useRef<HTMLButtonElement>(null)

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleMarkAllAsRead = () => {
    // implemnt logic
  }
  const totalUnRead = 9
  return (
    <>
      <IconButtonAnimate onClick={handleOpen} size="medium" ref={ref}>
        <Badge badgeContent={totalUnRead} color="error" sx={{ fontSize: '0.2rem !important' }}>
          <GoBellFill style={{ color: theme.colors.baseBlue, width: 22, height: 22, transform: 'rotate(30deg)' }} />
        </Badge>
      </IconButtonAnimate>
      <MenuPopover
        open={open}
        anchorEl={ref.current}
        disabledArrow={false}
        arrow={'top-right'}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} notifications unread
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButtonAnimate size="small" color="primary" onClick={handleMarkAllAsRead}>
                <BsCheck2All style={{}} />
              </IconButtonAnimate>
            </Tooltip>
          )}
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              New
            </ListSubheader>
          }
        >
          {notifications.map((notification, i) => (
            <NotificationItem key={Number(i)} {...notification} />
          ))}
        </List>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple sx={{ fontSize: '0.8rem' }}>
            See everything
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}

function NotificationItem(props: Notifications) {
  const { avatar, title } = renderContent(props)
  const { isUnRead } = props
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar size="small" sx={{ bgcolor: 'background.neutral' }}>
          {avatar}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <AiOutlineClockCircle style={{ mr: 0.5, width: 16, height: 16 }} />
            {/* {fToNow(createdAt)} */}
            &nbsp; yesterday
          </Typography>
        }
      />
    </ListItemButton>
  )
}
function renderContent(notification: Notifications) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  )

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_package.svg"
        />
      ),
      title
    }
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_shipping.svg"
        />
      ),
      title
    }
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_mail.svg"
        />
      ),
      title
    }
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_chat.svg"
        />
      ),
      title
    }
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title
  }
}
