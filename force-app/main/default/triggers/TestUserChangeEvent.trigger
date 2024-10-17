trigger TestUserChangeEvent on UserChangeEvent (after insert) {
	System.debug('user change event!');
    for (UserChangeEvent event : Trigger.New) { 
        EventBus.ChangeEventHeader header = event.ChangeEventHeader; 
        System.debug(header.changedFields); 
        System.debug(event.Email); 
        if(header.changedFields.contains('Email')){ //do something } 
        	System.debug('user change event!');
        } 
    }
}