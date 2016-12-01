<?php

function where($value, $pos) {
	foreach ($pos as $key => $val) {
		if($value[$key] != $val[$key]) {
			return false;
		}
	}
	return true;
}


//搜索
function select($list, $pos)
{
	$selected = array();
	foreach ($list as $value) {
		if (where($value, $pos)) {
			$display[] = $value;
		}
	}
	return $selected;
}

//删除
function delete($list, $pos)
{
	foreach ($list as $key => $value) {
		if (where($value, $pos)) {
			unset($list[$key]);
		}
	}
	return $list;
}

//增添
function insert($list, $newValue)
{
	$list[] = $newValue;
}

//update

function update($list, $pos, $change)
{
	foreach ($list as $key => &$value) {
		if (where($value, $pos)) {
			foreach ($change as $field => $val) {
				$value[$field] = $val;
			}
		}
	}
}