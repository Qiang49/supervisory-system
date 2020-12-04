import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Card,
    Row,
    Col,
    Select,
    Option,
    Table,
    TableColumn,
    Tag,
    Avatar,
    Pagination,
    Dialog,
    MessageBox,
    ButtonGroup,
    Upload,
    Tabs,
    TabPane,
    Badge,
    Divider,
    Progress,
    Rate,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Avatar)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(ButtonGroup)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Badge)
Vue.use(Divider)
Vue.use(Progress)
Vue.use(Rate)
Vue.use(Tooltip)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

// Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$Message = Message
Vue.prototype.$confirm = MessageBox.confirm