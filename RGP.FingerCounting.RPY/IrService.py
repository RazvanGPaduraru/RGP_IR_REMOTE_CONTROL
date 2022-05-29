from ircodec.command import CommandSet


def emmit_command(remoteData, button):
    controller = CommandSet.from_json(remoteData)
    try :
        controller.emmit(button)
    except Exception as e:
        print(e)
        return False
    return True

def create_remote(remote_name, remote_description):
    new_controller = CommandSet(emitter_gpio=17, receiver_gpio=18, name=remote_name, description=remote_description)
    return new_controller.to_json()


def add_button(remoteData, button : str):
    try:
        remoteData = remoteData.replace("\\", "")
        controller = CommandSet.from_json(remoteData)
        controller.add(button)
        return controller.to_json()
    except Exception as e:
        print(e)
        return False


def delete_button(remoteData, button : str):
    try:
        controller = CommandSet.from_json(remoteData)
        controller.remove(button)
        return controller.to_json()
    except Exception as e:
        print(e)
        return False

    
