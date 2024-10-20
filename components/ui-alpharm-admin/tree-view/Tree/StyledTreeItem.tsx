import { styled } from "@mui/material/styles";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
	"& .MuiTreeItem-content": {
		border: "none",
		padding: theme.spacing(0.5),
		textAlign: "left",
		position: "relative",
		backgroundColor: "transparent !important",
		whiteSpace: "nowrap",

		"&:hover": {
			backgroundColor: "transparent !important",
		},
		"& .Mui-focused": {
			backgroundColor: "transparent !important",
		},
	},
	"& .Mui-selected": {
		backgroundColor: "transparent !important",
		"&.Mui-focused": {
			backgroundColor: "transparent !important",
		},
	},
	"& .MuiTreeItem-content .MuiTreeItem-label": {
		paddingLeft: theme.spacing(0),
		width: "100%",
	},
	"& .MuiTreeItem-root": {
		position: "relative",
		"&:last-of-type": {
			"&:before": {
				height: 17,
			},
		},
		"&:before": {
			content: '""',
			display: "block",
			position: "absolute",
			left: -12,
			height: "100%",
			width: 1.5,
			backgroundColor: theme.palette.grey[200],
			zIndex: 10,
		},
	},
	[`& .${treeItemClasses.groupTransition}`]: {
		marginLeft: 0,
		paddingLeft: theme.spacing(3),
		zIndex: 10,
		"& .MuiTreeItem-content": {
			"&:before": {
				content: '""',
				position: "absolute",
				display: "block",
				width: 14,
				height: 1.5,
				backgroundColor: theme.palette.grey[200],
				top: "50%",
				left: 3,
				transform: "translate(-100%, -50%)",
				zIndex: 10,
			},
		},
	},
}));

export default StyledTreeItem;
