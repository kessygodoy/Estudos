extends Area2D
class_name EnemyAttackArea

@export_category("Variables")
@export var _attack_damage: int = 1

func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
	#pass


func _on_body_entered(_body) -> void:
	if _body is BaseCharacter:
		_body.update_health(_attack_damage, get_parent())
