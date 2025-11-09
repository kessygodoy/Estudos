extends AnimatedSprite2D
class_name	CharacterTexture

var _suffix: String = ""
var _is_on_action: bool = false

@export_category("Objects")
@export var player: BaseCharacter 
@export var _attack_area_collision: CollisionShape2D

func animate(_velocity: Vector2) -> void:
	_verify_direction(_velocity.x)
	
	#if not player._is_alive:
		#return
		
	if _is_on_action:
		return
		
	if not _velocity:
		play("idle" + _suffix)
		return
	
	if _velocity.y:
		if _velocity.y > 0:
			play("fall" + _suffix)
		
		if _velocity.y < 0:
			play("jump" + _suffix)
			
		return
		
	if _velocity.x:
		play("run" + _suffix)

func _verify_direction(_direction: float) -> void:
	if _direction > 0:
		flip_h = false
		_attack_area_collision.position.x = 24
	
	if _direction < 0:
		flip_h = true
		_attack_area_collision.position.x = -24

func action_animation(_action_name: String) -> void:
	_is_on_action = true
	
	if _action_name.contains("attack_"):
		play(_action_name + _suffix)
	else:
		play(_action_name)


func _on_animation_finished():
	_is_on_action = false
	if player.is_player_alive():
		player.set_physics_process(true)
	#if animation == "dead_hit":
		##player.set_physics_process(false)
	#player._jump_count = 2
		#player.velocity = Vector2.ZERO
	
func update_suffix(state: bool) -> void:
	if state:
		_suffix = "_with_sword"
		return
	
	_suffix = ""


func _on_frame_changed():
	var _current_animation: StringName = animation
	#if _current_animation.begins_with("air_attack") or _current_animation.begins_with("attack"):
		
	if _current_animation.begins_with("air_attack"):
		_attack_area_collision.position.y = 24
	if _current_animation.begins_with("attack"):
		_attack_area_collision.position.y = 0
			
	if animation.begins_with("air_attack"):
		if frame == 0 or 1:
			_attack_area_collision.disabled = false
		if frame == 2:
			_attack_area_collision.disabled = true
		
	if animation.begins_with("attack"):
		if frame == 0 or 1:
			_attack_area_collision.disabled = false
		if frame == 2:
			_attack_area_collision.disabled = true
			
	if animation == "throw_sword":
		if frame == 2:
			player.throw_sword(flip_h)
	

		
	if animation == "run" or animation == "run_with_sword":
		if frame == 1 or frame == 4:
			global.spawn_effect(
				"res://visual_effects/dust_particles/run/run_effect.tscn",
				Vector2(0,  2),
				global_position,
				flip_h
			)
