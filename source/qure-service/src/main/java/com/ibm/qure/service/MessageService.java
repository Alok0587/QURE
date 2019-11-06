package com.ibm.qure.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ibm.qure.model.Appointment;
import com.ibm.qure.model.Doctor;
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

//	@Autowired
//	private EmailCfg emailCfg;

	@Autowired
	JavaMailSender mailSender;

	@Autowired
	PatientService patientService;

	@Autowired
	DoctorService doctorService;

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
			params.add(new BasicNameValuePair("Body", "Welcome to Qure services, " + name));
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
			params.add(new BasicNameValuePair("Body",
					"Your appointment on " + appointment.getAppointmentDate() + " and time " + appointment.getTime()
							+ ":00 is booked. Pls check your registered mail for more details"));
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

			String mobile = (doctorService.getById(appointment.getDoctorId())).getPhone();
			log.debug(mobile);

			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("Body",
					"Your appointment on " + appointment.getAppointmentDate() + " and time " + appointment.getTime()
							+ ":00 is cancelled by the patient. Sorry" + "for the inconviniences caused"));
			params.add(new BasicNameValuePair("To", "+91" + mobile));
			params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

			MessageFactory messageFactory = client.getAccount().getMessageFactory();
			Message message = messageFactory.create(params);
			log.debug(message.getSid());
		} catch (TwilioRestException e) {
			log.debug(e.getErrorMessage());
		}
	}

	public void sendUpdateSMS(String mobile) {
		try {
			TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);

			// MessageList
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("Body", "Updated successfully"));
			params.add(new BasicNameValuePair("To", "+91" + mobile));
			params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

			MessageFactory messageFactory = client.getAccount().getMessageFactory();
			Message message = messageFactory.create(params);
			log.debug(message.getSid());
		} catch (TwilioRestException e) {
			log.debug(e.getErrorMessage());
		}
	}

	public void sendDeleteSMS(String mobile) {
		try {
			TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);

			// MessageList
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("Body",
					"Your profile has been removed from the QURE networks because the data "
							+ "you provided were found to be false. Please register again with correct details."
							+ " Sorry for the inconviniences caused"));
			params.add(new BasicNameValuePair("To", "+91" + mobile));
			params.add(new BasicNameValuePair("From", TWILIO_NUMBER));

			MessageFactory messageFactory = client.getAccount().getMessageFactory();
			Message message = messageFactory.create(params);
			log.debug(message.getSid());
		} catch (TwilioRestException e) {
			log.debug(e.getErrorMessage());
		}
	}

	public void sendEmail(String email, String name) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();

		mailMessage.setFrom("qureapplication@gmail.com");
		mailMessage.setTo(email);
		mailMessage.setSubject("Glad to see you at QURE");
		mailMessage.setText(
				"Welcome to QURE  " + name + ". We look forward to serve you. \n Thank you for being with us!");

		mailSender.send(mailMessage);

		System.out.println("Email sent successfully!");
	}

	public void sendAppointmentEmail(String email, Appointment appointment, Doctor doctor) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();

		mailMessage.setFrom("qureapplication@gmail.com");
		mailMessage.setTo(email, doctor.getEmail());
		mailMessage.setSubject("Appointment Booked for you, Id: " + appointment.getAppointmentId());
		mailMessage.setText("Appointment on " + appointment.getAppointmentDate() + " at " + appointment.getTime()
				+ ":00 with Dr. " + doctor.getName() + " \n" + "has been booked. Clinic address is " + doctor.getAddress()
				+ "" + "\n Thank you for being with us!");

		mailSender.send(mailMessage);

		System.out.println("Email sent successfully!");

	}

	public void deleteAppointmentEmail(String id) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();

		Appointment appointment = appointmentService.get(id);

		String email = (doctorService.getById(appointment.getDoctorId())).getEmail();

		mailMessage.setFrom("qureapplication@gmail.com");
		mailMessage.setTo(email);
		mailMessage.setSubject("Appointment Cancelled, appointment id: " + id);
		mailMessage.setText("Your appointment on " + appointment.getAppointmentDate() + " and time "
				+ appointment.getTime() + ":00 is cancelled by the patient. Sorry" + "for the inconviniences caused.");

		mailSender.send(mailMessage);

		System.out.println("Email sent successfully!");

	}

	public void sendUpdateEmail(String email) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();

		mailMessage.setFrom("qureapplication@gmail.com");
		mailMessage.setTo(email);
		mailMessage.setSubject("Updates from QURE");
		mailMessage.setText("Updated Successfully");

		mailSender.send(mailMessage);

		System.out.println("Email sent successfully!");
	}

	public void sendDeleteEmail(String email) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();

		mailMessage.setFrom("qureapplication@gmail.com");
		mailMessage.setTo(email);
		mailMessage.setSubject("IMPORTANT-Profile removed");
		mailMessage.setText("Your profile has been removed from the QURE networks because the data "
				+ "you provided were found to be false. Please register again with correct details."
				+ " Sorry for the inconviniences caused");

		mailSender.send(mailMessage);

		System.out.println("Email sent successfully!");
	}
	public void sendFogotPass(String email, String otp) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();

		mailMessage.setFrom("qureapplication@gmail.com");
		mailMessage.setTo(email);
		mailMessage.setSubject("IMPORTANT-OTP");
		mailMessage.setText("Otp to change password is: "+otp);

		mailSender.send(mailMessage);

		System.out.println("Email sent successfully!");
	}
}
