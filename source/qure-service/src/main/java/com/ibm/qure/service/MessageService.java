package com.ibm.qure.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.qure.model.Appointment;
import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.MessageFactory;
import com.twilio.sdk.resource.instance.Message;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {
	private static Logger log = LoggerFactory.getLogger(MessageService.class);
	@Autowired
	PatientService patientService;

	@Autowired
	AppointmentService appointmentService;

	public static final String ACCOUNT_SID = "ACc51d870c9de9a27cfb76ef94a3a192f9";
	public static final String AUTH_TOKEN = "8af8e3de253ef6a0ee7f814f581f0b5e";
	public static final String TWILIO_NUMBER = "+18572148925";

	public void sendSMS(String mobile, String name) {
		try {
			TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);

			// MessageList
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("Body", "Welcome to Qure services, Mr/Mrs " + name));
			params.add(new BasicNameValuePair("To", "+91" + mobile));
			params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

			MessageFactory messageFactory = client.getAccount().getMessageFactory();
			Message message = messageFactory.create(params);
			log.debug(message.getSid());
		} catch (TwilioRestException e) {
			log.debug(e.getErrorMessage());
		}
	}

	public void sendAppointmentSMS(Appointment appointment) {
		try {
			log.debug("before mobile");
			TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);

			String mobile = patientService.getById(appointment.getPatientId()).getPhone();
			log.debug(mobile);

			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("Body", "Your appointment on " + appointment.getAppointmentDate()
					+ " and time " + appointment.getTime() + " is booked"));
			params.add(new BasicNameValuePair("To", "+91" + mobile));
			params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

			MessageFactory messageFactory = client.getAccount().getMessageFactory();
			Message message = messageFactory.create(params);
			log.debug(message.getSid());
		} catch (TwilioRestException e) {
			log.debug(e.getErrorMessage());
		}
	}

	public void cancelAppointmentSMS(String id) {
		try {
			TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);

			Appointment appointment = appointmentService.get(id);

			String mobile = (patientService.getById(appointment.getPatientId())).getPhone();
			log.debug(mobile);

			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("Body",
					"Your appointment on " + appointment.getAppointmentDate() + " and time " + appointment.getTime()
							+ " is canelled due to the no availability of the doctor. Sorry"
							+ "for the inconviniences caused"));
			params.add(new BasicNameValuePair("To", "+91" + mobile));
			params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

			MessageFactory messageFactory = client.getAccount().getMessageFactory();
			Message message = messageFactory.create(params);
			log.debug(message.getSid());
		} catch (TwilioRestException e) {
			log.debug(e.getErrorMessage());
		}
	}

}
