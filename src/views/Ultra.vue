<template>

<!-- <form method="post" id="search" onsubmit="send_form(0, false); return false;" class="form-inline content-block"> -->
<div id="search_inputs">
    <div id="search_general">
        <strong class="search-label">
            <a>Card Name</a> <!-- TODO sort arrow -->
        </strong>

        <input type="text" name="name" id="name" class="form-control"> <input type="button" class="btn btn-default" value="clear" onclick="clear()" /><br />
			
        <strong class="search-label">Card Text</strong> <input type="text" name="card_text" id="card_text" class="form-control" /> <input type="button" class="btn btn-default" value="clear" onclick="$('#card_text').clear();" /><br />
        <strong class="search-label">Format</strong>
            <input type="radio" name="format" value="all" id="format_all" /> <label for="format_all">All</label>
            <input type="radio" name="format" value="standard" id="format_standard" /> <label for="format_standard">Standard</label>
            <input type="radio" name="format" value="extended" id="format_extended" /> <label for="format_extended">Extended</label>
            <input type="radio" name="format" value="legacy" id="format_legacy" /> <label for="format_legacy">Legacy</label>
            <input type="radio" name="format" value="turbo" id="format_turbo" /> <label for="format_turbo">Turbo</label>
            <br />
        <strong class="search-label"><a href="tri.php?tri=type" onclick="return tri($(this));">Type<span class="tri"><!--<?php echo tri('type'); ?> implements sort arrow--></span></a></strong>
            <input type="checkbox" name="type[]" value="character" id="character_checkbox"> <label for="character_checkbox">Character</label>
            <input type="checkbox" name="type[]" value="action" id="action_checkbox"> <label for="action_checkbox">Action</label>
            <input type="checkbox" name="type[]" value="asset" id="asset_checkbox"> <label for="asset_checkbox">Asset</label>
            <input type="checkbox" name="type[]" value="attack" id="attack_checkbox"> <label for="attack_checkbox">Attack</label>
            <input type="checkbox" name="type[]" value="foundation" id="foundation_checkbox"> <label for="foundation_checkbox">Foundation</label>
        <br />
        <div id="rarity_div">
            <strong class="search-label"><a href="tri.php?tri=rarity" onclick="return tri($(this));">Rarity<span class="tri"></span></a></strong>
            <div id="rarity_list">
                <div v-for="rarity in rarities" :key=rarity class="float_rarity"><input type="checkbox" name="rarity[]" :value=rarity v-bind:id="rarity + '_checkbox'" /> <label v-bind:for="rarity + '_checkbox'">{{rarity}}</label></div>
            
            </div>
        </div>
            <br style="clear : both;" />
        <strong class="search-label">Set</strong>
        <select name="extension[]" id="extension" multiple class="form-control">
                <option v-for="extension in sets" :key=extension :value="extension">{{extension}}</option>
        </select><br />
        <strong class="search-label-big">Resource Symbol</strong> <input type="checkbox" name="ressource_match_all" id="ressource_match_all" /> <label for="ressource_match_all"><small>Match All Selected Resources</small></label>
        <div id="rs_div">
            <div v-for="symbol in symbols" :key=symbol class="float_rs"><input type="checkbox" name="rs[]" :value=symbol v-bind:id="'rs_' + symbol"><label v-bind:for="'rs_' + symbol"><img v-bind:src="require('@/assets/icons/' + symbol.toLowerCase() + '.png')" style="vertical-align -1px;" /> {{symbol}}</label></div>
        </div><br />
    </div>
    <div id="search_infos">
        <strong class="search-label"><a href="tri.php?tri=cc" onclick="return tri($(this));">Control</a></strong>
        <span v-for="eye in [0, 1, 2, 3, 4, 5, 6]" :key=eye>
            <input type="checkbox" name="cc[]" :value=eye v-bind:id="'cc_' + eye" /><label v-bind:for="'cc_' + eye">{{eye ? eye : 'X'}}</label>
        </span>
        <br />
        <strong class="search-label"><a href="tri.php?tri=difficulty" onclick="return tri($(this));">Difficulty</a></strong> <select name="difficulty_operand" class="form-control input-sm"><option value=">">></option><option value="=" selected="selected">=</option><option value="<">&lt;</option></select><input type="text" class="form-control" name="difficulty" id="difficulty" /><br />
        <strong class="search-label">Keyword</strong> <input type="checkbox" name="keyword_match_all" id="keyword_match_all" /> <label for="keyword_match_all"><small>Match All Selected Keywords</small></label>
        <div id="keyword_div">
            <div class="float_keyword" v-for="keyword in keywords" :key=keyword>
                <input type="checkbox" name="keyword[]" v-bind:id="'keyword_' + keyword" :value=keyword><label v-bind:for="'keyword_' + keyword">{{keyword}}</label>
            </div>
        </div>
        <div id="block_div">
            <strong class="search-label-medium"><a href="tri.php?tri=block" onclick="return tri($(this));">Block Modifier</a></strong> <select name="bm_operand" class="form-control"><option value=">">></option><option value="=" selected="selected">=</option><option value="<">&lt;</option></select> <input type="text" class="form-control" name="block" id="block" /><br />
        </div>
        <strong class="search-label-medium"><a href="tri.php?tri=block_zone" onclick="return tri($(this));">Block Zone</a></strong>
        <span v-for="zone in zones" :key=zone>
            <input type="checkbox" name="block_zone[]" :value=zone v-bind:id="'block_' + zone" /> <label v-bind:for="'block_' + zone">{{capitalize(zone)}}</label>
        </span>
        <br />
        <strong class="search-label-medium"><a href="tri.php?tri=speed" onclick="return tri($(this));">Attack Speed</a></strong> <select name="as_operand" class="form-control"><option value=">">></option><option value="=" selected="selected">=</option><option value="<">&lt;</option></select> <input type="text" class="form-control" name="speed" id="speed" /><br />
        <strong class="search-label-medium"><a href="tri.php?tri=damage" onclick="return tri($(this));">Attack Damage</a></strong> <select name="ad_operand" class="form-control"><option value=">">></option><option value="=" selected="selected">=</option><option value="<">&lt;</option></select> <input type="text" class="form-control" name="damage" id="damage" /><br />
        <strong class="search-label-medium"><a href="tri.php?tri=attack_zone" onclick="return tri($(this));">Attack Zone</a></strong>
        <span v-for="zone in zones" :key=zone>
            <input type="checkbox" name="attack_zone[]" :value=zone v-bind:id="'attack_' + zone" /> <label v-bind:for="'attack_' + zone">{{capitalize(zone)}}</label>
        </span>
        <br />
        <div id="search_more" v-if="showMore">
            <strong class="search-label-medium"><a href="tri.php?tri=hand_size" onclick="return tri($(this));">Hand Size</a></strong> 
            <span v-for="hs in [3, 4, 5, 6, 7, 8]" :key=hs>
                <input type="checkbox" name="hs[]" :value=hs v-bind:id="'hs_' + hs" /> <label v-bind:for="'hs_' + hs">{{hs}}</label>
            </span>
            <br />
            <strong class="search-label-medium"><a href="tri.php?tri=vitality" onclick="return tri($(this));">Vitality</a></strong><select name="v_operand" class="form-control"><option value=">">></option><option value="=" selected="selected">=</option><option value="<">&lt;</option></select> <input type="text" class="form-control" name="vitality" id="vitality" /><br />
            <strong class="search-label-big">Keyword additional text</strong> <input type="text" class="form-control" name="keyword_text" id="keyword_text" /><br />
            <strong class="search-label-big">Keyword count</strong> <select name="keyword_count_operand" class="form-control input-sm"><option value=">">></option><option value="=" selected="selected">=</option><option value="<">&lt;</option></select> <input type="text" class="form-control" name="keyword_count" id="keyword_count" /><br/>
        </div>
        <div id="search_buttons" >
            <span class="pull-right btn btn-default btn-sm" id="btn_search_more" title="More Options">
                <button @click="showMore = !showMore">{{showMore ? "Show Less" : "Show More"}}</button>
            </span>
            <!-- <button type="submit" class="btn btn-success" onclick="$('#search').submit(); return false;"><i class="glyphicon glyphicon-search"></i>Search</button> 
            <input type="reset" class="btn btn-default" name="reset" id="reset" value="Reset" onclick="$('#div_reset').load('tri.php?tri=reset'); $('.tri').html('');" /> -->
            <div id="div_reset"></div>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'Ultra',
  data() {
      return {
          rarities: ['Common', 'Uncommon', 'Rare', 'Ultra Rare', 'Promo'],
          symbols: ["Air", "All", "Chaos", "Death", "Earth", "Evil", "Fire", "Good", "Infinity", "Life", "Order", "Void", "Water"],
          sets: [ '2020Promo', 'DLC'],
          zones: ["high", "mid", "low"],
          keywords: ['Weapon', 'Combo', 'Ally', 'Reversal', 'Stun', 'Breaker', 'Unique', 'Ranged', 'Throw', 'Kick', 'Multiple', 'Desperation', 
            'Terrain', 'Punch', 'Powerful', 'Only', 'Taunt', 'Flash', 'Safe', 'Slam', 'Charge', 'Fury', 'Tech', 'EX', 'Deadlock', 'Gauge'
          ],
          showMore: false
      }
  },
  methods: {
      capitalize(str) {
          return str.charAt(0).toUpperCase() + str.slice(1)
      }
  }
}
</script>

<style>
body
{
    font-family : arial;
    background-color : #D9D9D9;
    padding : 0;
    margin : 0;
}

form
{
	margin : 0;
}

a
{
    color : #555;
}

a:hover
{
    color : #222;
}

select
{
	width : auto !important;
	height : auto;
	padding : 0 !important;
}

label
{
	margin : 0;
	padding-left : 3px;
}

input[type="text"], input[type="password"]
{
	height : 25px;
	margin : 1px;
	padding : 3px;
}

#login, #password, #edit_deck_name
{
	height: 30px;
	margin: 0;
}

input[type=checkbox], input[type=radio]
{
	padding : 0 !important;
	margin : 0 !important;
}

.clear
{
    clear : both;
}


.pagination
{
    text-align : center;
}

img.mini_image
{
	width : 150px;
	height : 210px;
	border-radius: 5px;
	box-shadow: 0 2px 3px #666;
	vertical-align: bottom;
}

img.ci-small_image
{
	width : 50px;
	height : 70px;
	float : left;
	border-radius: 3px;
	box-shadow: 0 1px 2px #666;
	vertical-align: bottom;
}

img.ci-micro_image
{
	width : 20px;
	height : 20px;
	border-radius: 2px;
	box-shadow: 0 1px 2px #666;
	vertical-align: bottom;
}

.deck-info
{
	width: 250px;
	display: inline-block;
}

.deck-info-format
{
	cursor: pointer;
}

#content
{
    float : left;
}

#preview
{
    float : left;
    position : fixed;
    left : 880px;
    bottom : 10px;
}

#preview:hover
{
    z-index : 5 !important;
}

#preview-image {
    z-index : -1;
}

#preview ul, #preview li {
    padding : 0;
    margin : 0;
}

.card
{
	clear : both;
	border : 1px solid #989DB3;
	padding-top : 3px;
	width : 870px;
}

.odd
{
    background-color : #d9e0ff;
}

.even
{
    background-color : #c8cee9;
}

.card:hover
{
    background-color : #989DB3;
    cursor : pointer;
}

.card_image
{
    float : left;
    padding : 3px;
}

.card_infos
{
	width : 710px;
	float : left;
}

.card_infos .actions
{
    width : 30px;
    padding : 0 !important;
	float: right;
}

.card_infos .actions .btn
{
	padding : 4px;
}

.card_infos .actions ul, .card_infos .actions li
{
    margin : 0;
    padding : 0;
    list-style-type: none;
}

.card_infos h1
{
	margin : 0;
}

.card_title
{
    width : 100%;
    padding : 10px;
}

.card_division
{
	padding : 10px;
	float : left;
}

.cd1
{
    width : 200px;
}

.cd2
{
    width : 360px;
}

.cd3
{
    width : 105px;
    padding : 0;
}

.float_rs
{
    display : block;
    float : left;
    width : 95px;
}

.float_rarity
{
    display : block;
    float : left;
    margin-right : 3px;
    margin-left : 2px;
}

.float_keyword
{
    display : block;
    float : left;
    width : 110px;
}

#search
{
    width : 936px;
	margin-left : 5px;
	z-index : 1;
}

#search select
{
	height: auto;
	vertical-align : middle;
}

#search select#extension {
	height: 88px;
}

#search_general
{
    float : left;
    padding : 5px;
}

#search_infos
{
    float : left;
    border-left : 1px solid black;
    padding : 5px 5px 5px 10px;
}

#search_attack
{
    float : left;
    border-left : 1px solid black;
    padding : 5px;
    height : 260px;
}

#search_buttons
{
    text-align : center;
    margin : auto;
    clear : both;
}

#search_buttons button
{
    width : 200px;
}

#btn_search_more
{
	margin-right: 5px;
	margin-top: 10px;
}

.search-label
{
	width: 17%;
	display: inline-block;
	padding-top: 3px;
	padding-bottom: 3px;
}

.search-label-medium
{
	width: 30%;
	display: inline-block;
}

.search-label-big
{
	width: 40%;
	display: inline-block;
}

.debug
{
    display : none;
}

#extension, #keyword, #rs
{
    height : 64px;
}

#search_general, #rs_div, #rarity_div
{
    width : 475px;
}

#search_inputs .form-control
{
	width: auto !important;
}

#rarity_div strong
{
    float : left;
}
#rarity_list
{
    margin-left : 60px;
}

#search_infos, #search_infos #keyword_div, #block_div
{
    width : 440px;
}

#block_div
{
	clear : both;
}

input
{
    padding : 0;
    margin : 3px 3px 3px 1px;
}

#search a
{
    text-decoration : none;
    color : black;
}

.deck-actions .pull-right
{
	margin-right : 15px;
}

.report-card
{
	min-height: 80px;
}

.report-card div
{
	padding-left: 60px;
}

/* CLUETIP */
.cluetip-inner h4
{
    margin : 0;
    padding : 0;
}

table {
  border: solid 1px #D5D5D5;
  border-collapse: collapse;
}

table td {
	border:1px solid #D5D5D5;
	font-size:12px;
	padding:7px 5px;
}

table tr:hover
{
	background-color:#ccc;
	font-weight : bold;
}

table th {
	background-color:#EEE;
	border-right:1px solid #D5D5D5;
	font-size:13.5px;
	line-height:120%;
	font-weight:bold;
	padding:8px 5px;
	text-align:left;
}
.ui-resizable {
	position:relative;
}
.ui-resizable-handle {
	display:block;
	font-size:0.1px;
	position:absolute;
	z-index:99999;
}

.ui-resizable-s { 
	border-top:1px solid #CCCCCC;
	bottom:-5px;
	cursor:s-resize;
	height:14px;
	left:0;width:100%; 
}

/* DECK */

h1
{
    display : inline;
}

.deck-header h2, .deck-header h4
{
	display: inline;
}

.listing_deck h4
{
	margin-top: 3px;
}


.listing_deck ul, .listing_deck li
{
    list-style-type : none;
    margin : 0;
    padding : 0;
    cursor : pointer;
}

.listing_deck ul
{
    padding-left : 2px;
}

.listing_deck
{
    width : 750px;
}

.listing_deck div
{
    width : 370px;
    padding : 3px 0 3px 3px;
}

.listing_deck h3
{
    padding : 0;
    margin : 0;
	line-height: 25px;
}

.listing_deck_right, .listing_deck_left
{
    float : left;
}

.listing_deck div a
{
    color : #cfcfcf;
}

.action
{
    display : none;
}

.type_card_character
{
   /* background-color : #485693;*/
}

.type_card_attack
{
    /*background-color : #d25421;*/
}

.type_card_foundation
{
    /* background-color : #b6a7a0; */
}

.type_card_asset
{
    /*background-color : #a3bf75;*/
}

.type_card_action
{
    /*background-color : #7e9cc0;*/
}

.type_card_side
{
}

.card-list
{
    border: 1px outset graytext;
    border-radius: 4px 4px 4px 4px;
    height: 24px;
    margin: 1px 0 0 !important;
    padding: 0px 3px 0px 3px !important;
    width: 95%;
    line-height: 22px;
    list-style-type: none;
    -moz-box-sizing: content-box !important;
}
.card-list:hover
{
    border: 1px inset black;
}
.card-list-onthefly
{
    height: 23px;
    margin: 0px 0 0 !important;
    padding: 0px 3px 0px 3px !important;
    width: 357px;
    line-height: 21px;
    list-style-type: none;
    -moz-box-sizing: content-box !important;
    font-size : 13px;
}

.switchPreview {
	text-align: center;
}

.card-important-info {
	float: right;
	margin-right: 0px;
	font-weight: bold;
	font-size: 16px;
	text-align: right;
}

.card-list-character {
    background-color : #485693;
}
.card-list-foundation {
    background-color: #B6A7A0;
}
.card-list-attack {
    background-color : #d25421;
}
.card-list-asset {
    background-color : #a3bf75;
}
.card-list-action {
    background-color : #7e9cc0;
}
.card-list-side {
    background-color : #999999;
}

.card-list .badge, .card-list-onthefly .badge
{
	float : right;
	margin-top : 3px;
}

.actions .badge
{
	padding-left: 5px;
	padding-right: 5px;
}

.listing_deck li .set_card_deck
{
    float: right;
    height: 24px;
    margin-right: 3px;
	margin-bottom: 0;
}

#preview_listing_deck
{
    float : left;
    position : fixed;
    left : 762px;
    top : 35px;
}

h1 a, h1 .small
{
    font-size : 0.4em;
	vertical-align: middle;
}

h1 .icon
{
	vertical-align: middle !important;
}

.actions ul li
{
    width : 40px;
}

#deck-btn-actions label
{
	display: inline-block;
}

#deck-btn-actions
{
	display: inline-block;
	vertical-align: middle;
	float: right;
	margin : 0 !important;
}

#deck-btn-actions a, #deck-btn-actions label, #deck-btn-actions input
{
	font-size: 9pt !important;
	text-align: left;
}

.deck-badges
{
	margin-right: 3px;
}

.deck_infos
{
    vertical-align : middle;
}

.deck-header
{
	margin-left: 10px;
	width: 715px;
	background-color: #bbb;
	border: 1px solid #999;
	border-radius: 5px;
	padding: 5px 10px 5px 10px;
	min-height: 80px;
}

.deck-actions
{
    margin-top: 17px;
}

/*.deck-actions .deck-sort-by
{
	display: none;
}*/

.card-list-small
{
    font-size: 0.9em;
}

.card-list-xsmall
{
    font-size: 0.85em;
}

.deck-sort
{
	margin-left: 10px;
	width: 715px;
	padding: 5px 10px 5px 10px;
}

#code_forum
{
	height: 300px;
    width: 720px;
}

.avatar-deck
{
	float : left;
	width : 280px;
	margin : 0 5px 5px 0;
	border : 1px solid grey;
	border-radius : 3px;
}

.avatar-deck .ci-small_image
{
	margin: 1px 3px 1px 1px;
	width : 50px;
	height : 70px;
}

.avatar-deck .img-ci-small
{
	width : 50px;
	height : 70px;
}

.avatar-deck-info
{
	width : 230px;
}

.avatar-deck-info > span
{
	display : block;
	height: 22px;
}

.deck-list
{
	margin-left: 5px;
	width: 750px;
}

.deck-list-deck
{
	float : left;
	width : 350px;
	margin : 0 5px 5px 0;
	border : 1px solid grey;
	height: 75px;
	background-color : #fff;
	border-radius: 3px;
}

.deck-list-deck-info
{
	width : 290px;
	margin-left : 55px;
}

.deck-list-deck .ci-small_image
{
	margin-top : 1px;
	margin-left : 1px;
	width : 50px;
	height : 70px;
}

.deck-list-deck-stats
{
    display: none;
    position: absolute;
    z-index: 2;
	text-align: right;
	width: 45px;
	height: 55px;
	padding-top: 5px;
}

.deck-list-deck-info > span
{
	display : block;
}

.modal-body
{
	padding : 5px;
}

.content-block
{
    background-color: #F3FAFB;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px 4px 4px 4px;
    padding-bottom : 5px;
    min-height: 20px;
}

.navbar
{
	margin-bottom: 5px;
}

.ui-autocomplete
{
	max-height: 100px;
	overflow-y: auto;
	/* prevent horizontal scrollbar */
	overflow-x: hidden;
}

.form-proxy fieldset:hover
{
	background-color: #ccc;
}

/* PAGINATION */

.pagination {
  margin: 3px 0;
}

#footer
{
	clear: both;
	margin-left: 368px;
	padding-top: 20px;
}

#paypal
{
	clear: both;
	margin-left: 419px;
	padding-top: 20px;
}

#deck-tabs
{
	margin-bottom : 0px;
}

#deck-description-textarea
{
	width : 400px;
	height : 150px;
}

.deck-card-format-info
{
	display: none;
}

.live-avatar
{
	width: 3% !important;
	margin-top: 10px;
}

.live-info
{
	margin-left : 0.8% !important;
}

.live-deck-name
{
	padding-top: 3px;
}

.avatar-popover-content, .avatar-popover-title
{
	display : none;
}

#deck-comments .deck-comments-hided
{
	display : none;
}

.deck-comment p
{
	font-weight: normal !important;
	font-size: 14px;
}

#deck-comments .btn-group
{
	margin-bottom: 5px;
}

.well .deck-comment-follow blockquote {
    border-color: rgba(0, 0, 0, 0.30) !important;
}

.well .deck-comment-owner blockquote {
    border-color: rgba(0, 0, 0, 0.45) !important;
}

.live-event
{
	border-bottom: 1px dotted #aaa;
}

.deck-actions-hided
{
	display	: none;
}

.live-listing blockquote {
    border-left: 4px solid rgba(0, 0, 0, 0.15);
    font-size: 0.9em;
    padding: 3px 12px;
}

.live-listing blockquote blockquote {
    border-left: 2px solid rgba(0, 0, 0, 0.15);
    padding: 3px 12px;
	margin: 4px 0 4px 0;
}

/* BOOTSTRAP REWRITE */
label
{
	font-weight	: normal;
}

.btn-sm
{
	padding: 3px 5px !important;
}

.modal-body
{
    max-height: 500px;
    overflow-y: auto;
}

.badge-error {
  background-color: #b94a48;
}
.badge-error:hover {
  background-color: #953b39;
}
.badge-warning {
  background-color: #f89406;
}
.badge-warning:hover {
  background-color: #c67605;
}
.badge-success {
  background-color: #468847;
}
.badge-success:hover {
  background-color: #356635;
}
.badge-info {
  background-color: #3a87ad;
}
.badge-info:hover {
  background-color: #2d6987;
}
.badge-inverse {
  background-color: #333333;
}
.badge-inverse:hover {
  background-color: #1a1a1a;
}

.navbar-nav > li > a
{
	padding-top : 10px !important;
	padding-bottom : 10px !important;
}

.navbar-brand
{
	padding : 10px !important;
}

.navbar
{
	min-height: 40px !important;
}


.popover-content *, .popover-content *:before, .popover-content *:after
{
    -moz-box-sizing: initial;
}

.carousel-indicators
{
	top: 5px;
	bottom: auto;
}

.carousel-caption
{
	position:static;
	color: black;
}

.carousel-indicators li {
  background-color: #999;
}

.carousel-indicators .active {
  background-color: #000;
}

.carousel-inner > .item > img, .carousel-inner > .item > a > img {
  margin: auto;
}

.ias_loader
{
	clear : both;
	text-align: center;
}

</style>