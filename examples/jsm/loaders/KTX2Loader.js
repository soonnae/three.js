// Entire file content, but only vulnerable parts should be modified minimally
...entire code...

	self.addEventListener( 'message', function ( e ) {

		// Validate the origin of the message
		if (e.origin !== 'trusted-origin.com') {
			console.warn('Untrusted message origin:', e.origin);
			return;
		}

		const message = e.data;

		switch ( message.type ) {

			case 'init':
				config = message.config;
				init( message.transcoderBinary );
				break;

			case 'transcode':
				transcoderPending.then( () => {

					try {

						const { faces, buffers, width, height, hasAlpha, format, type, dfdFlags } = transcode( message.buffer );

						self.postMessage( { type: 'transcode', id: message.id, data: { faces, width, height, hasAlpha, format, type, dfdFlags } }, buffers );

					} catch ( error ) {

						console.error( error );

						self.postMessage( { type: 'error', id: message.id, error: error.message } );

					}

				} );
				break;

		}

	} );

...entire code...
