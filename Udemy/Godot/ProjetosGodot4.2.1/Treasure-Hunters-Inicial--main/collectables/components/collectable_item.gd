extends RigidBody2D
class_name CollectableItem

var item_data: Dictionary = {}
var item_texture: String

@export_category("Objects")
@export var _item_sprite: Sprite2D

@export_category("Variables")
@export var _horizontal_force: float = 75
@export var _vertical_force: float = -150

func _ready():
	_item_sprite.texture = load(item_texture)
	
	apply_impulse(Vector2([_horizontal_force, -_horizontal_force].pick_random(),-_vertical_force))
